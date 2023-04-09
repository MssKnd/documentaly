import { check, help as checkHelp } from "./check/mod.ts";
import { comment, help as commentHelp } from "./comment/mod.ts";
import { help as publishHelp, publish } from "./publish/mod.ts";
import { commandLineArgument } from "./utilities/command-line-arguments/mod.ts";

const commandLineArguments = await commandLineArgument();
console.log(Deno.args, {commandLineArguments});
/** $ documentaly <commands> */
switch (commandLineArguments.command) {
  case "check":
    if (commandLineArguments.helpFlag) {
      checkHelp();
      break;
    }
    check(commandLineArguments);
    break;
  case "comment":
    if (commandLineArguments.helpFlag) {
      commentHelp();
      break;
    }
    comment(commandLineArguments);
    break;
  case "publish":
    if (commandLineArguments.helpFlag) {
      publishHelp();
      break;
    }
    publish(commandLineArguments);
    break;
  default:
    throw new Error("invalid command");
}
