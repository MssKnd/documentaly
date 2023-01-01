import { getChangedFiles } from "./arrange-git-diff/mod.ts";
import { commandLineArgument } from "./get-configuration/command-line-arguments/mod.ts";
import { DependencyConfig } from "./search-markdown-files/dependency-config.ts";
import { FilePath } from "./search-markdown-files/file-path.ts";
import {
  documentDependencies,
  reverseDependencyMap,
} from "./search-markdown-files/main.ts";
import {
  hasMarkdownExtention,
  MarkdonwFilePath,
  validateMarkdownFilePath,
} from "./search-markdown-files/markdown-file-path.ts";

const {
  // helpFlag,
  targetBranch,
  filePaths,
} = commandLineArgument();

/** get markdown config map */

/** create dipendency map */
const { filePathDependencyMap } = await documentDependencies(
  filePaths.map((filePath) => String(filePath)),
);

/** get diff files */
const changedFiles = await getChangedFiles(targetBranch);

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

console.log(`json=${JSON.stringify(result)}`);
