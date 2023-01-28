import { isString } from "../../utilities/type-guard.ts";
import { validateFilePath } from "../file-path/mod.ts";

/**
 * @param {{filePaths: string[], t: string}} input
 * @param {string[]} input.filePaths - target file paths.
 * @param {string} input.t - target branch name. command line argument -t
 * @returns {{filePaths: string[], targetBranch: string}} object
 * @returns {string} object.filePaths - target file paths.
 * @returns {string} object.targetBranch - target branch name.
 */
function validateCommandLineArgument(input: Record<string, unknown>) {
  if (
    !("filePaths" in input) || !Array.isArray(input.filePaths) ||
    !("t" in input)
  ) {
    throw new Error("invalid check command argument");
  }
  const filePaths = input.filePaths.map((filePath) =>
    validateFilePath(filePath)
  );
  return {
    targetBranch: isString(input.t) ? input.t : "main",
    filePaths: filePaths.length > 0 ? filePaths : [validateFilePath(".")],
  };
}

export { validateCommandLineArgument };
