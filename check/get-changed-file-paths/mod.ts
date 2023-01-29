import { $ } from "../deps.ts";
import { FilePath, validateFilePath } from "../file-path/mod.ts";

function diff(target: string): Promise<string> {
  return $`git diff --name-only HEAD ${target}`.text();
}

async function getChangedFilePaths(
  targetBranchName: string,
): Promise<FilePath[]> {
  const result = await diff(targetBranchName);
  return result.split(/\n/).map((filePath) => validateFilePath(filePath));
}

export { getChangedFilePaths };
