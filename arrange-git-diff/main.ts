import $ from "https://deno.land/x/dax@0.17.0/mod.ts";
import {
  FilePath,
  validateFilePath,
} from "../search-markdown-files/file-path.ts";

function diff(target: RemoteBranch): Promise<string> {
  return $`git diff ${target}..HEAD`.text();
}

function extractFilenameFromGitDiffResult(diffResult: string): FilePath[] {
  const filePathLines = diffResult.match(/^(---|\+\+\+) (a|b)\/(.+?)$/gm);
  if (filePathLines && filePathLines?.length < 1) {
    throw new Error("no result");
  }
  const justFilePaths =
    filePathLines?.map((line) =>
      validateFilePath(line.replace(/^(---|\+\+\+) (a|b)\//, ""))
    ) ?? [];
  const uniqueFileNames = [...new Set(justFilePaths)];
  return uniqueFileNames;
}

async function main() {
  const target: RemoteBranch = "origin/main";
  const result = await diff(target);
  // console.log(result)
  const changedFiles = extractFilenameFromGitDiffResult(result);
  // console.log(re)
  return changedFiles;
}

type RemoteBranch = `${string}/${string}`;

export { main as getChangedFiles };
