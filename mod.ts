import { check, help as checkHelp } from "./check/mod.ts";
import { comment, help as commentHelp } from "./comment/mod.ts";
import { commandLineArgument } from "./utilities/command-line-arguments/mod.ts";

const {
  helpFlag,
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
    if (helpFlag) {
      checkHelp();
      Deno.exit(0);
    }
    check(filePaths, targetBranch);
    break;
  case "comment":
    if (helpFlag) {
      commentHelp();
      Deno.exit(0);
    }
    if (!json || !branchName || !headSha) {
      throw new Error("invalid argument");
    }
    comment(json, branchName, headSha);
    break;
  case "publish":
    console.log('------');
    break;
  default:
    throw new Error("invalid command");
}
