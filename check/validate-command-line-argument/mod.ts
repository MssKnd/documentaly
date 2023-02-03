import { isString } from "../../utilities/type-guard.ts";
import { validateFilePath } from "../file-path/mod.ts";
import { validateMarkdownFilePath } from "../search-markdown-files/markdown-file-path.ts";

const alias = {
  t: "targetBranchName",
  m: "markdownFilePaths",
} as const;

/**
 * @param {{filePaths: string[], t: string}} input
 * @param {string[]} input.filePaths - change file paths.
 * @param {string[]} input.markdownFilePaths - markdown file or directory paths. separated comma.
 * @param {string} input.targetBranchName - target branch name. command line argument -t
 * @returns {{filePaths: string[], targetBranch: string}} object
 * @returns {string} object.filePaths - target file paths.
 * @returns {string} object.targetBranch - target branch name.
 */
function validateCommandLineArgument(input: Record<string, unknown>) {
  if (
    !("filePaths" in input) || !Array.isArray(input.filePaths)
  ) {
    throw new Error("invalid check command argument");
  }
  const filePaths = input.filePaths.map((filePath) =>
    validateFilePath(filePath)
  );
  console.log(input)
  return {
    targetBranch:
      "targetBranchName" in input && isString(input.targetBranchName)
        ? input.targetBranchName
        : "main",
    filePaths: filePaths.length > 0 ? filePaths : [validateFilePath(".")],
    markdownFilePaths:
      "markdownFilePaths" in input && isString(input.markdownFilePaths)
        ? input.markdownFilePaths.split(",").map((markdownFilePath) =>
          validateMarkdownFilePath(markdownFilePath)
        )
        : [],
  };
}

export { alias, validateCommandLineArgument };
