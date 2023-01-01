import $ from "https://deno.land/x/dax@0.17.0/mod.ts";
import {
  FilePath,
  validateFilePath,
} from "../search-markdown-files/file-path.ts";
import { BranchName } from "./branch-name.ts";

function diff(target: BranchName): Promise<string> {
  const t = 'main'
  return $`git diff ${t}..HEAD`.text();
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

async function main(targetBranchName: BranchName) {
  const result = await diff(targetBranchName);
  const changedFiles = extractFilenameFromGitDiffResult(result);
  return changedFiles;
}

export { main as getChangedFiles };
