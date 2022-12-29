import { getChangedFiles } from "./arrange-git-diff/mod.ts";
import { documentDependencies, reverseMap } from "./search-markdown-files/main.ts";


/** get config */


/** get markdown config map */

/** create dipendency map */
const {filePathDependencyMap} = await documentDependencies()

/** get diff files */
const changedFiles = await getChangedFiles()


console.log(filePathDependencyMap)
console.log(changedFiles)

for (const changedFilePath of changedFiles) {
  if(filePathDependencyMap.has(changedFilePath)) {
    filePathDependencyMap.delete(changedFilePath)
  }
}

const dependencyFilePathMap = reverseMap(filePathDependencyMap as any)
console.log(dependencyFilePathMap)

const unmaintainedMarkdown = Array.from(dependencyFilePathMap.keys()).flatMap((key) => {
  const fileRegExp = new RegExp(key)
  const changedFileHasDependencies = changedFiles.filter(changedFile => changedFile.match(fileRegExp))
  return [changedFileHasDependencies, dependencyFilePathMap.get(key)]
})

console.log(unmaintainedMarkdown)
