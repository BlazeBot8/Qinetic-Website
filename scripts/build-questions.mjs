// Turns the question-pool text file into supabase/seed/questions.sql.
//
//   node scripts/build-questions.mjs "C:\path\to\quantum_course_question_pools.txt"
//   npx supabase db query --linked -f supabase/seed/questions.sql
//
// The output replaces the whole question bank, so re-running it after editing the
// text file is safe. supabase/seed/ is gitignored: it holds the answer key.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const input = process.argv[2];
if (!input) {
  console.error("usage: node scripts/build-questions.mjs <pool.txt>");
  process.exit(1);
}

const lines = readFileSync(input, "utf8").split(/\r?\n/);
const questions = [];

let kind = null;
let module = null;
let current = null;

const flush = () => {
  if (!current) return;
  questions.push({ kind, module, ...current });
  current = null;
};

for (const raw of lines) {
  const line = raw.trimEnd();

  const mod = line.match(/^MODULE (\d):/);
  if (mod) {
    flush();
    kind = "module";
    module = Number(mod[1]);
    continue;
  }
  if (/^FINAL EXAM POOL/.test(line)) {
    flush();
    kind = "final";
    continue;
  }
  const part = line.match(/^--- Part (\d):/);
  if (part) {
    flush();
    module = Number(part[1]);
    continue;
  }

  const q = line.match(/^(\d+)\. (.+)$/);
  if (q && kind) {
    flush();
    current = { prompt: q[2].trim(), options: [], answer: null };
    continue;
  }
  const opt = line.match(/^\s+([A-D])\) (.+)$/);
  if (opt && current) {
    current.options.push(opt[2].trim());
    continue;
  }
  const ans = line.match(/^\s+Answer: ([A-D])$/);
  if (ans && current) {
    current.answer = "ABCD".indexOf(ans[1]);
  }
}
flush();

// Validate before writing anything.
const errors = [];
const tally = {};
for (const q of questions) {
  const key = `${q.kind}:${q.module}`;
  tally[key] = (tally[key] ?? 0) + 1;
  if (q.options.length !== 4) errors.push(`"${q.prompt}" has ${q.options.length} options`);
  if (q.answer === null || q.answer < 0) errors.push(`"${q.prompt}" has no answer`);
}
for (let m = 1; m <= 5; m++) {
  if (tally[`module:${m}`] !== 30) errors.push(`module ${m}: ${tally[`module:${m}`]} questions, expected 30`);
  if (tally[`final:${m}`] !== 20) errors.push(`final part ${m}: ${tally[`final:${m}`]} questions, expected 20`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const sql = (s) => `'${s.replaceAll("'", "''")}'`;
const rows = questions.map(
  (q) =>
    `(${sql(q.kind)}, ${q.module}, ${sql(q.prompt)}, ${sql(JSON.stringify(q.options))}::jsonb, ${q.answer}, null)`,
);

mkdirSync("supabase/seed", { recursive: true });
writeFileSync(
  "supabase/seed/questions.sql",
  `begin;\ndelete from public.questions;\ninsert into public.questions (kind, module, prompt, options, correct, explanation) values\n${rows.join(",\n")};\ncommit;\n`,
);

const dist = [0, 0, 0, 0];
questions.forEach((q) => dist[q.answer]++);
console.log(`${questions.length} questions parsed`, tally);
console.log("correct-answer position A/B/C/D:", dist.join(" / "));
