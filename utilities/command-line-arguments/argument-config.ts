import {
  FilePath,
  validateFilePath,
} from "../../check/search-markdown-files/mod.ts";
import { isBoolean, isObject, isString } from "../../utilities/mod.ts";

type Command = "check" | "comment";

type CommandLineArgument = {
  helpFlag: boolean;
  command: Command;
  targetBranch: string;
  filePaths: FilePath[];
  json?: string;
  headSha?: string;
  branchName?: string;
};

function validateCommand(input: unknown): Command {
  if (!isString(input)) {
    throw new Error();
  }
  switch (input) {
    case "check":
      return "check";
    case "comment":
      return "comment";
    default:
      throw new Error("invalid command");
  }
}

/** validate command line argument */
function validateCommandLineArgument(input: unknown) {
  const baseConfig: CommandLineArgument = {
    helpFlag: false,
    targetBranch: "main",
    command: "check",
    filePaths: ["." as FilePath],
    json: undefined,
    headSha: undefined,
    branchName: undefined,
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
    "j" in input && isString(input.j)
  ) {
    baseConfig.json = input.j;
  } else {
    baseConfig.json = "[]";
  }
  if (
    "s" in input && isString(input.s)
  ) {
    baseConfig.headSha = input.s;
  } else {
    baseConfig.headSha = undefined;
  }
  if (
    "b" in input && isString(input.b)
  ) {
    baseConfig.branchName = input.b;
  } else {
    baseConfig.branchName = undefined;
  }
  if (
    "_" in input && Array.isArray(input._)
  ) {
    const [command, ...filePaths] = input._;
    baseConfig.command = validateCommand(command);
    baseConfig.filePaths = filePaths.map((filePath) =>
      validateFilePath(filePath)
    );
  }
  if (baseConfig.filePaths.length === 0) {
    baseConfig.filePaths = [validateFilePath(".")];
  }
  return baseConfig;
}

export { validateCommandLineArgument };
