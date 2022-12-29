import $ from "https://deno.land/x/dax@0.17.0/mod.ts";

function diff(target: RemoteBranch): Promise<string> {
  return $`git diff ${target}..HEAD`.text();
}

function extractFilenameFromGitDiffResult(diffResult: string): string[] {
  const fileNameLines = diffResult.match(/^(---|\+\+\+) (a|b)\/(.+?)$/gm);
  if (fileNameLines && fileNameLines?.length < 1) {
    throw new Error('no result')
  }
  const justFileNames = fileNameLines?.map((name) =>
    name.replace(/^(---|\+\+\+) (a|b)\//, "")
  );
  const uniqueFileNames = [...new Set(justFileNames)];
  return uniqueFileNames;
}


async function main() {
  const target: RemoteBranch = "origin/main";
  const result = await diff(target);
  // console.log(result)
  const changedFiles = extractFilenameFromGitDiffResult(result);
  // console.log(re)
  return changedFiles
}

type RemoteBranch = `${string}/${string}`;

export {main as getChangedFiles}