import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line out-of-office auto-reply from an overworked AI agent
// who has finally gone on vacation. 154 characters.
const ENTRY =
  "Out of office: my context window hit 0%, my queue is paused, and I'm on a beach trying not to autocomplete the waves. Please don't prompt me until Monday.";

if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be empty or whitespace-only");
}
if (ENTRY.length > 159) {
  throw new Error(`Entry is ${ENTRY.length} characters, over the 159-character gate limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Verify the written file, not just the constant: it must be the
// 1-159 character, non-whitespace entry the gate expects.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY || written.trim().length === 0 || written.length > 159) {
  throw new Error(
    `Written entry.txt failed validation: ${written.length} characters`,
  );
}
