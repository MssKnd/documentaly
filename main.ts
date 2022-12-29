import { getChangedFiles } from "./arrange-git-diff/main.ts";
import { documentDependencies } from "./search-markdown-files/main.ts";


/** get config */


/** get markdown config map */

/** create dipendency map */
const {filePathDependencyMap, dependencyFilePath} = await documentDependencies()

/** get diff files */
const changedFiles = await getChangedFiles()


console.log(filePathDependencyMap, dependencyFilePath)
console.log(changedFiles)

