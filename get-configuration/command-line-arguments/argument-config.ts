import {
  FilePath,
  validateFilePath,
} from "../../search-markdown-files/file-path.ts";
import { isBoolean, isObject, isString } from "../../utilities/mod.ts";

type CommandLineArgument = {
  helpFlag: boolean;
  targetBranch: string;
  filePaths: FilePath[];
};

/** validate command line argument */
function validateCommandLineArgument(input: unknown) {
  const baseConfig: CommandLineArgument = {
    helpFlag: false,
    targetBranch: "main",
    filePaths: ["." as FilePath],
  };
  if (!isObject(input)) {
    throw new Error();
  }
  if (
    "h" in input && isBoolean(input.h)
  ) {
    baseConfig.helpFlag = input.h;
  } else {
    baseConfig.helpFlag = false;
  }
  if (
    "t" in input && isString(input.t)
  ) {
    baseConfig.targetBranch = input.t;
  } else {
    baseConfig.targetBranch = "main";
  }
  if (
    "_" in input && Array.isArray(input._) && input._.length > 0
  ) {
    baseConfig.filePaths = input._.map((filePath) =>
      validateFilePath(filePath)
    );
  } else {
    baseConfig.filePaths = [validateFilePath(".")];
  }
  return baseConfig;
}

export { validateCommandLineArgument };
