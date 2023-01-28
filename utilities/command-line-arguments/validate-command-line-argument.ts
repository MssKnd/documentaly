import { validateCommandLineArgument as validateCheckCommandLineArgument } from "../../check/validate-command-line-argument/mod.ts";
import { validateCommandLineArgument as validateCommentCommandLineArgument } from "../../comment/validate-command-line-argument/mod.ts";
import { validateCommandLineArgument as validatePublishCommandLineArgument } from "../../publish/validate-command-line-argument/mod.ts";
import { isBoolean, isObject, isString } from "../../utilities/mod.ts";

type Command = "check" | "comment" | "publish";

// type BaseCommandLineArgument = {
//   helpFlag: boolean; // -h
//   command: Command;
// }

function validateCommand(input: unknown): Command {
  if (!isString(input)) {
    throw new Error();
  }
  switch (input) {
    case "check":
      return "check";
    case "comment":
      return "comment";
    case "publish":
      return "publish";
    default:
      throw new Error("invalid command");
  }
}

/** validate command line argument */
function validateCommandLineArgument(input: unknown) {
  if (!isObject(input)) {
    throw new Error();
  }

  if (
    !("_" in input) || !Array.isArray(input._)
  ) {
    throw new Error("");
  }

  const [command, ...filePaths] = input._;
  const validCommand = validateCommand(command);

  if ("h" in input && isBoolean(input.h) ? input.h : false) {
    return {
      command: validCommand,
      helpFlag: true,
    } as const;
  }

  switch (validCommand) {
    case "check":
      return {
        command: "check",
        ...validateCheckCommandLineArgument({ ...input, filePaths }),
      } as const;
    case "comment":
      return {
        command: "comment",
        ...validateCommentCommandLineArgument({ ...input }),
      } as const;
    case "publish":
      return {
        command: "publish",
        ...validatePublishCommandLineArgument({ ...input, filePaths }),
      } as const;
    default:
      throw new Error();
  }
}

export { validateCommandLineArgument };
