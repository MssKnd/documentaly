import { parse } from "https://deno.land/std@0.171.0/flags/mod.ts";
import { validateCommandLineArgument } from "./argument-config.ts";

/** parsing and validating command line argument */
function main() {
  return validateCommandLineArgument(parse(Deno.args));
}

export { main as commandLineArgument };
