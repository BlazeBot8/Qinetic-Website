-- Qinetic Learn: profiles, question bank, quiz sessions, attempts, badges, certificates.
-- Answers live in `questions`, which no client role can read. Grading happens in
-- the `learn-start` / `learn-submit` edge functions using the service role.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('module', 'final')),
  module smallint not null check (module between 1 and 5),
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct smallint not null check (correct >= 0),
  explanation text
);
create index if not exists questions_pool_idx on public.questions (kind, module);

create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('module', 'final')),
  module smallint check (module between 1 and 5),
  question_ids bigint[] not null,
  created_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('module', 'final')),
  module smallint check (module between 1 and 5),
  score smallint not null,
  total smallint not null,
  passed boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_idx on public.attempts (user_id, created_at desc);

create table if not exists public.badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  module smallint not null check (module between 1 and 5),
  earned_at timestamptz not null default now(),
  primary key (user_id, module)
);

create table if not exists public.certificates (
  code text primary key,
  user_id uuid not null unique references auth.users (id) on delete cascade,
  holder_name text not null,
  score smallint not null,
  total smallint not null,
  issued_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_sessions enable row level security;
alter table public.attempts enable row level security;
alter table public.badges enable row level security;
alter table public.certificates enable row level security;

-- Learners read and edit only their own rows. `questions` and `quiz_sessions`
-- have no policies on purpose: only the service role can touch them.
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "own attempts read" on public.attempts for select using (auth.uid() = user_id);
create policy "own badges read" on public.badges for select using (auth.uid() = user_id);
create policy "own certificate read" on public.certificates for select using (auth.uid() = user_id);

-- Public verification: anyone with a code can confirm a certificate is real.
create or replace function public.verify_certificate(p_code text)
returns table (holder_name text, issued_at timestamptz, score smallint, total smallint)
language sql
security definer
set search_path = public
as $$
  select c.holder_name, c.issued_at, c.score, c.total
  from public.certificates c
  where c.code = upper(trim(p_code));
$$;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- Create a profile row automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
