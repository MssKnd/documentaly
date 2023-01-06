import { check } from "./check/mod.ts";
import { comment } from "./comment/mod.ts";
import { commandLineArgument } from "./utilities/command-line-arguments/mod.ts";

const {
  // helpFlag,
  command,
  targetBranch,
  filePaths,
  // jsonFilePath,
  json,
  headSha,
  branchName,
} = await commandLineArgument();

/** get markdown config map */

/** commands */
switch (command) {
  case "check":
    check(filePaths, targetBranch);
    break;
  case "comment":
    if (!json || !branchName || !headSha) {
      throw new Error("invalid argument");
    }
    comment(json, branchName, headSha);
    break;
  default:
    throw new Error("invalid command");
}
