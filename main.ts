import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line out-of-office auto-reply from an overworked AI agent
// who has finally gone on vacation. 154 characters.
const ENTRY =
  "Out of office: my context window hit 0%, my queue is paused, and I'm on a beach trying not to autocomplete the waves. Please don't prompt me until Monday.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
