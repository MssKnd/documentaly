import { parse } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { validateCommandLineArgument } from "./validate-command-line-argument.ts";

/** parsing and validating command line argument */
function commandLineArgument() {
  return validateCommandLineArgument(parse(Deno.args));
}

export { commandLineArgument };
