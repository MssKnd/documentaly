import { parse } from "https://deno.land/std@0.181.0/flags/mod.ts";
import { validateCommandLineArgument } from "./validate-command-line-argument.ts";
import { alias as commentAlias } from "../../comment/validate-command-line-argument/mod.ts";
import { alias as checkAlias } from "../../check/validate-command-line-argument/mod.ts";

/** parsing and validating command line argument */
function commandLineArgument() {
  return validateCommandLineArgument(parse(Deno.args, {
    alias: {
      h: "help",
      _: "filePaths",
      ...checkAlias,
      ...commentAlias,
    },
  }));
}

export { commandLineArgument };
