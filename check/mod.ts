import {
  documentDependencies,
  reverseDependencyMap,
} from "./search-markdown-files/mod.ts";
import {
  FilePath,
  hasMarkdownExtention,
  MarkdonwFilePath,
  validateMarkdownFilePath,
} from "../utilities/path/mod.ts";

type Props = {
  filePaths: FilePath[];
  targetBranch: string;
  markdownFilePaths: MarkdonwFilePath[];
};

async function check(
  { filePaths: changedFiles, markdownFilePaths }: Props,
) {
  const DependencyFileGroupByMarkdownMap = await documentDependencies(
    markdownFilePaths,
  );

  const changedMarkdownFiles = changedFiles.filter((changedFile) =>
    hasMarkdownExtention(changedFile)
  ).map((changedMarkdownFile) => validateMarkdownFilePath(changedMarkdownFile));

  const markdownGroupByDipendencyFileMap = reverseDependencyMap(
    DependencyFileGroupByMarkdownMap,
  );

  const changedFileGroupByMarkdown = Array.from(
    markdownGroupByDipendencyFileMap.entries(),
  )
    .flatMap(
      ([path, markdownFilePaths]) => {
        const pathRegExp = new RegExp(path);
        const dependentChangedFile = changedFiles.filter((changedFile) =>
          changedFile.match(pathRegExp)
        );
        return markdownFilePaths.map((markdownFilePath) =>
          [markdownFilePath, dependentChangedFile] as const
        );
      },
    );

  const result = changedFileGroupByMarkdown.filter(([_, dependentFilePaths]) =>
    dependentFilePaths.length > 0
  )
    .map((
      [markdownFilePath, changedDependencyFiles],
    ) => ({
      markdownFilePath,
      changedDependencyFiles,
      changed: changedMarkdownFiles.includes(markdownFilePath),
    }));

  console.log(`${JSON.stringify(result)}`);
}

// TODO: add to describe Markdown grammar
function help() {
  console.info(`usage: documentaly check [options]

Options:
  -h,                   show this help message and exit
  -t TARGET_BRANCH,
                        target branch to compare with

This command compares the specified target branch with the current branch and outputs a list of markdown files that have not been updated accordingly.
  `);
}

export { check, help };
