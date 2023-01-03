import { getChangedFiles } from "./arrange-git-diff/mod.ts";
import {
  DependencyConfig,
  documentDependencies,
  FilePath,
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

export { check };
