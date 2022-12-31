import { isValidBranchName } from "../../arrange-git-diff/branch-name.ts";
import {
  FilePath,
  validateFilePath,
} from "../../search-markdown-files/file-path.ts";
import { isBoolean, isObject } from "../../utilities/mod.ts";

type CommandLineArgument = {
  helpFlag: boolean;
  targetBranch: `${string}/${string}`;
  filePaths: FilePath[];
};

/** validate command line argument */
function validateCommandLineArgument(input: unknown) {
  const baseConfig: CommandLineArgument = {
    helpFlag: false,
    targetBranch: "origin/main",
    filePaths: ["." as FilePath],
  };
  if (!isObject(input)) {
    throw new Error();
  }
  if (
    "h" in input && isBoolean(input.helpFlag)
  ) {
    baseConfig.helpFlag = input.helpFlag;
  }
  if (
    "t" in input && isValidBranchName(input.targetBranch)
  ) {
    baseConfig.targetBranch = input.targetBranch;
  }
  if (
    "_" in input && Array.isArray(input.filePaths)
  ) {
    baseConfig.filePaths = input.filePaths.map((filePath) =>
      validateFilePath(filePath)
    );
  }
  return baseConfig;
}

export { validateCommandLineArgument };
