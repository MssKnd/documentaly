import $ from "https://deno.land/x/dax@0.17.0/mod.ts";
import { validateFilePath } from "../search-markdown-files/file-path.ts";
// import {
//   FilePath,
//   validateFilePath,
// } from "../search-markdown-files/file-path.ts";
// import { BranchName } from "./branch-name.ts";

function diff(target: string): Promise<string> {
  // return $`git diff ${t}..HEAD`.text();
  return $`git diff --name-only HEAD ${target}`.text()
}

// function extractFilenameFromGitDiffResult(diffResult: string): FilePath[] {
//   const filePathLines = diffResult.match(/^(---|\+\+\+) (a|b)\/(.+?)$/gm);
//   if (filePathLines && filePathLines?.length < 1) {
//     throw new Error("no result");
//   }
//   const justFilePaths =
//     filePathLines?.map((line) =>
//       validateFilePath(line.replace(/^(---|\+\+\+) (a|b)\//, ""))
//     ) ?? [];
//   const uniqueFileNames = [...new Set(justFilePaths)];
//   return uniqueFileNames;
// }

async function main(targetBranchName: string) {
  const result = await diff(targetBranchName);
  return result.split(/\n/).map(filePath => validateFilePath(filePath))
  // const changedFiles = extractFilenameFromGitDiffResult(result);
  // return changedFiles;
}

export { main as getChangedFiles };
