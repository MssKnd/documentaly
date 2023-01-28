import { getChangedFiles } from "./arrange-git-diff/mod.ts";
import { DependencyConfig } from "./dependency-config/mod.ts";
import { FilePath } from "./file-path/mod.ts";
import {
  documentDependencies,
  hasMarkdownExtention,
  MarkdonwFilePath,
  reverseDependencyMap,
  validateMarkdownFilePath,
} from "./search-markdown-files/mod.ts";

function removeChangedDocumentFromDependencyMap(
  documentDependencyMap: Map<MarkdonwFilePath, DependencyConfig>,
  changedFiles: FilePath[],
): Map<MarkdonwFilePath, DependencyConfig> {
  const documentDependencyMapCopy = new Map(documentDependencyMap);
  for (const changedFilePath of changedFiles) {
    if (hasMarkdownExtention(changedFilePath)) {
      const markdownPath = validateMarkdownFilePath(changedFilePath);
      if (documentDependencyMapCopy.has(markdownPath)) {
        documentDependencyMapCopy.delete(markdownPath);
      }
    }
  }
  return documentDependencyMapCopy;
}

async function check(filePaths: FilePath[], targetBranch: string) {
  const [filePathDependencyMap, changedFiles] = await Promise.all([
    /** create dipendency map */
    documentDependencies(
      filePaths.map((filePath) => String(filePath)),
    ),
    /** get diff files */
    getChangedFiles(targetBranch),
  ]);

  const unchangedDocumentDependencyMap = removeChangedDocumentFromDependencyMap(
    filePathDependencyMap,
    changedFiles,
  );

  const dependencyFilePathMap = reverseDependencyMap(
    unchangedDocumentDependencyMap,
  );

  const unmaintainedMarkdown = Array.from(dependencyFilePathMap.entries())
    .flatMap(
      ([key, value]) => {
        const filePathRegExp = new RegExp(key);
        const changedFileHasDependencies = changedFiles.filter((changedFile) =>
          changedFile.match(filePathRegExp)
        );
        return value.map((markdown) =>
          [markdown, changedFileHasDependencies] as const
        );
      },
    );

  const result = unmaintainedMarkdown.filter(([_, changedDependencyfiles]) =>
    changedDependencyfiles.length > 0
  ).map(([markdownFilePath, changedDependencyfiles]) => ({
    markdownFilePath,
    changedDependencyfiles,
  }));

  console.log(`${JSON.stringify(result)}`);
}

// TODO: add to describe Markdown grammar
function help() {
  console.log(`
  usage: documentaly check [options]

  Options:
    -h,                   show this help message and exit
    -t TARGET_BRANCH,
                          target branch to compare with
  
  This command compares the specified target branch with the current branch and outputs a list of markdown files that have not been updated accordingly.
  `);
}

export { check, help };
