import { validateCommandLineArgument as validateCheckCommandLineArgument } from "../../check/validate-command-line-argument/mod.ts";
import { validateCommandLineArgument as validateCommentCommandLineArgument } from "../../comment/validate-command-line-argument/mod.ts";
import { validateCommandLineArgument as validatePublishCommandLineArgument } from "../../publish/validate-command-line-argument/mod.ts";
import { isBoolean, isObject, isString, isArray } from "../mod.ts";

type Command = "check" | "comment" | "publish";

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

/**
 * github actions で以下の記載をしており、ファイル名が "aaa.md bbb.md ccc.md" とスペース区切り文字列になってしまっているので対応している
 *
 * FIXME: gh からの値を正しく複数のファイル名として取得できるように変更して、この関数を削除する
 *
 * ```bash
 * documentaly publish
 * $(gh pr diff ${PR_NUMBER} --name-only | grep '\.md$' | tr "\n" " "  )
 * --notion-api-key ${{ env.NOTION_API_TOKEN }}
 * ```
 */
function correctNonFlugArguments(args: unknown[]) {
  return args.flatMap((arg) => {
    if (!isString(arg)) {
      throw Error("invalid argument");
    }
    return arg.trim().split(" ");
  });
}

/**
 * validate command line argument
 *
 * input is expected below.
 * ```ts
 * type commandLineArgument = {
 *   command: Command;
 *   helpFlag: boolean; // -h
 * }
 * ```
 */
function validateCommandLineArgument(input: unknown) {
  if (
    !isObject(input) || !("_" in input) || !isArray(input._)
  ) {
    throw new Error("invalid argument");
  }

  const [command, ...filePaths] = correctNonFlugArguments(input._);
  const validCommand = validateCommand(command);

  if ("help" in input && isBoolean(input.help) ? input.help : false) {
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
