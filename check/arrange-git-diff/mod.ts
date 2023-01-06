import { $ } from "../deps.ts";
import { validateFilePath } from "../search-markdown-files/mod.ts";

function diff(target: string): Promise<string> {
  return $`git diff --name-only HEAD ${target}`.text();
}

async function main(targetBranchName: string) {
  const result = await diff(targetBranchName);
  return result.split(/\n/).map((filePath) => validateFilePath(filePath));
}

export { main as getChangedFiles };
