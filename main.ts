import { getChangedFiles } from "./arrange-git-diff/mod.ts";
import { DependencyConfig } from "./search-markdown-files/dependency-config.ts";
import { FilePath } from "./search-markdown-files/file-path.ts";
import {
  documentDependencies,
  reverseMap,
} from "./search-markdown-files/main.ts";

/** get config */

/** get markdown config map */

/** create dipendency map */
const { filePathDependencyMap } = await documentDependencies();

/** get diff files */
const changedFiles = await getChangedFiles();

console.log(filePathDependencyMap);
console.log(changedFiles);

function removeChangedDocumentFromDependencyMap(
  documentDependencyMap: Map<FilePath, DependencyConfig>,
  changedFiles: FilePath[],
) {
  const documentDependencyMapCopy = new Map(documentDependencyMap);
  for (const changedFilePath of changedFiles) {
    if (documentDependencyMapCopy.has(changedFilePath)) {
      documentDependencyMapCopy.delete(changedFilePath);
    }
  }
  return documentDependencyMapCopy;
}

const unchangedDocumentDependencyMap = removeChangedDocumentFromDependencyMap(
  filePathDependencyMap,
  changedFiles,
);

const dependencyFilePathMap = reverseMap(unchangedDocumentDependencyMap);
console.log(dependencyFilePathMap);

const unmaintainedMarkdown = Array.from(dependencyFilePathMap.keys()).map(
  (key) => {
    const fileRegExp = new RegExp(key);
    const changedFileHasDependencies = changedFiles.filter((changedFile) =>
      changedFile.match(fileRegExp)
    );
    return [changedFileHasDependencies, dependencyFilePathMap.get(key)];
  },
);

console.log(unmaintainedMarkdown);

console.log(JSON.stringify(unmaintainedMarkdown));
