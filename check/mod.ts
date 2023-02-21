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

  const changedMarkdownFileSet = new Set(
    changedFiles.filter((changedFile) => hasMarkdownExtention(changedFile)).map(
      (changedMarkdownFile) => validateMarkdownFilePath(changedMarkdownFile),
    ),
  );

  const markdownGroupByDipendencyFileMap = reverseDependencyMap(
    DependencyFileGroupByMarkdownMap,
  );

  const changedFileGroupByMarkdown = new Map<MarkdonwFilePath, Set<FilePath>>();
  Array.from(
    markdownGroupByDipendencyFileMap.entries(),
  )
    .flatMap(
      ([regExpPath, markdownFilePathSet]) => {
        const pathRegExp = new RegExp(regExpPath);
        const dependentChangedFiles = changedFiles.filter((changedFile) =>
          changedFile.match(pathRegExp)
        );
        if (dependentChangedFiles.length < 1) {
          return [];
        }
        return [...markdownFilePathSet].map((
          markdownFilePath,
        ) => ({ markdownFilePath, dependentChangedFiles } as const));
      },
    )
    .forEach(({ markdownFilePath, dependentChangedFiles }) => {
      if (changedFileGroupByMarkdown.has(markdownFilePath)) {
        const dependentChangedFileSet = new Set([
          ...changedFileGroupByMarkdown.get(markdownFilePath) ?? [],
          ...dependentChangedFiles,
        ]);
        changedFileGroupByMarkdown.set(
          markdownFilePath,
          dependentChangedFileSet,
        );
        return;
      }
      changedFileGroupByMarkdown.set(
        markdownFilePath,
        new Set([...dependentChangedFiles]),
      );
    });

  const result = Array.from(changedFileGroupByMarkdown.entries())
    .map((
      [markdownFilePath, changedDependencyFileSet],
    ) => ({
      markdownFilePath,
      changedDependencyFiles: [...changedDependencyFileSet],
      changed: changedMarkdownFileSet.has(markdownFilePath),
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
