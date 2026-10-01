import {
  admin,
  FINAL_PER_MODULE,
  json,
  MODULE_COUNT,
  MODULE_QUESTIONS,
  preflight,
  requireUser,
  shuffle,
} from "../_shared/common.ts";

type Row = { id: number; module: number; prompt: string; options: string[] };

async function draw(kind: "module" | "final", module: number, count: number) {
  const { data, error } = await admin
    .from("questions")
    .select("id, module, prompt, options")
    .eq("kind", kind)
    .eq("module", module);
  if (error) throw error;
  const pool = (data ?? []) as Row[];
  if (pool.length < count) return null;
  return shuffle(pool).slice(0, count);
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  const user = await requireUser(req);
  if (!user) return json({ error: "Please sign in." }, 401);

  const body = await req.json().catch(() => ({}));
  const kind = body.kind === "final" ? "final" : "module";
  const module = Number(body.module);

  const { data: badgeRows } = await admin
    .from("badges")
    .select("module")
    .eq("user_id", user.id);
  const earned = new Set((badgeRows ?? []).map((b) => b.module));

  let picked: Row[] = [];
  let sessionModule: number | null = null;

  if (kind === "module") {
    if (!Number.isInteger(module) || module < 1 || module > MODULE_COUNT) {
      return json({ error: "Unknown module." }, 400);
    }
    if (module > 1 && !earned.has(module - 1)) {
      return json({ error: `Pass Module ${module - 1} first.` }, 403);
    }
    const rows = await draw("module", module, MODULE_QUESTIONS);
    if (!rows) return json({ error: "This quiz is not ready yet." }, 503);
    picked = rows;
    sessionModule = module;
  } else {
    if (earned.size < MODULE_COUNT) {
      return json({ error: "Earn all five badges first." }, 403);
    }
    const { data: existing } = await admin
      .from("certificates")
      .select("code")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing) {
      return json({ error: "Already certified.", code: existing.code }, 409);
    }
    const { data: profile } = await admin
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile?.display_name?.trim()) {
      return json(
        { error: "Add your name on your profile first. It goes on the certificate." },
        400,
      );
    }
    for (let m = 1; m <= MODULE_COUNT; m++) {
      const rows = await draw("final", m, FINAL_PER_MODULE);
      if (!rows) return json({ error: "The final is not ready yet." }, 503);
      picked.push(...rows);
    }
  }

  const questions = shuffle(picked);
  const { data: session, error } = await admin
    .from("quiz_sessions")
    .insert({
      user_id: user.id,
      kind,
      module: sessionModule,
      question_ids: questions.map((q) => q.id),
    })
    .select("id")
    .single();
  if (error) return json({ error: "Could not start the quiz." }, 500);

  return json({
    session_id: session.id,
    questions: questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: q.options,
    })),
  });
});
