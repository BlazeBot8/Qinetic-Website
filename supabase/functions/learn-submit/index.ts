import {
  admin,
  FINAL_PASS,
  json,
  MODULE_PASS,
  preflight,
  requireUser,
  SESSION_MAX_AGE_MS,
} from "../_shared/common.ts";

// No 0/O/1/I so codes survive being read aloud or retyped.
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function newCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  const user = await requireUser(req);
  if (!user) return json({ error: "Please sign in." }, 401);

  const body = await req.json().catch(() => ({}));
  const answers = (body.answers ?? {}) as Record<string, unknown>;

  // Claiming the session (submitted_at is null -> now) makes a double submit a no-op.
  const { data: session } = await admin
    .from("quiz_sessions")
    .update({ submitted_at: new Date().toISOString() })
    .eq("id", String(body.session_id ?? ""))
    .eq("user_id", user.id)
    .is("submitted_at", null)
    .select("*")
    .maybeSingle();
  if (!session) {
    return json({ error: "This quiz was already submitted or has expired." }, 409);
  }
  if (Date.now() - new Date(session.created_at).getTime() > SESSION_MAX_AGE_MS) {
    return json({ error: "This quiz timed out. Start a new one." }, 410);
  }

  const { data: rows, error } = await admin
    .from("questions")
    .select("id, correct, explanation")
    .in("id", session.question_ids);
  if (error || !rows) return json({ error: "Could not grade the quiz." }, 500);

  const byId = new Map(rows.map((r) => [r.id, r]));
  const results = (session.question_ids as number[]).map((id) => {
    const q = byId.get(id)!;
    const chosen = Number.isInteger(answers[String(id)])
      ? (answers[String(id)] as number)
      : null;
    return {
      id,
      chosen,
      correct: q.correct,
      ok: chosen === q.correct,
      explanation: q.explanation,
    };
  });

  const score = results.filter((r) => r.ok).length;
  const total = results.length;
  const passed = score >= (session.kind === "final" ? FINAL_PASS : MODULE_PASS);

  await admin.from("attempts").insert({
    user_id: user.id,
    kind: session.kind,
    module: session.module,
    score,
    total,
    passed,
  });

  let badge: number | null = null;
  let certificate: string | null = null;

  if (passed && session.kind === "module") {
    await admin
      .from("badges")
      .upsert(
        { user_id: user.id, module: session.module },
        { onConflict: "user_id,module", ignoreDuplicates: true },
      );
    badge = session.module;
  }

  if (passed && session.kind === "final") {
    const { data: profile } = await admin
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle();
    const { data: existing } = await admin
      .from("certificates")
      .select("code")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing) {
      certificate = existing.code;
    } else {
      const code = newCode();
      const { error: certError } = await admin.from("certificates").insert({
        code,
        user_id: user.id,
        holder_name: profile?.display_name?.trim() || "Qinetic Graduate",
        score,
        total,
      });
      if (!certError) certificate = code;
    }
  }

  return json({ score, total, passed, results, badge, certificate });
});
