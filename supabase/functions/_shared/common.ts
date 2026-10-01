import { createClient } from "npm:@supabase/supabase-js@2";

export const MODULE_COUNT = 5;
export const MODULE_QUESTIONS = 10;
export const MODULE_PASS = 7;
export const FINAL_PER_MODULE = 7;
export const FINAL_QUESTIONS = FINAL_PER_MODULE * MODULE_COUNT;
export const FINAL_PASS = 28;
export const SESSION_MAX_AGE_MS = 3 * 60 * 60 * 1000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function preflight(req: Request) {
  return req.method === "OPTIONS"
    ? new Response("ok", { headers: corsHeaders })
    : null;
}

// Service-role client: bypasses RLS. Never return raw rows from `questions`
// without stripping `correct` and `explanation`.
export const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

export async function requireUser(req: Request) {
  const token = (req.headers.get("Authorization") ?? "").replace(
    /^Bearer\s+/i,
    "",
  );
  if (!token) return null;
  const { data, error } = await admin.auth.getUser(token);
  return error ? null : data.user;
}

// Fisher-Yates with crypto randomness.
export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
