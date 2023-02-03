import { isString } from "../../utilities/type-guard.ts";

const alias = {
  j: "jsonString",
  s: "sha",
  b: "branchName",
} as const

/**
 * @param {{j: string, s: string, b: string}} input
 * @param {string} input.j - json string. command line argument -j
 * @param {string} input.s - head commit sha. command line argument -s
 * @param {string} input.b - branch name. command line argument -b
 * @returns {{json: string, headSha: string, branchName: string}} object
 * @returns {string} object.json - json string
 * @returns {string} object.headSha - head commit sha
 * @returns {string} object.branchName - branch name
 */
function validateCommandLineArgument(input: Record<string, unknown>) {
  if (
    !("jsonString" in input) || !isString(input.jsonString) ||
    !("sha" in input) || !isString(input.sha) ||
    !("branchName" in input) || !isString(input.branchName)
  ) {
    throw new Error("invalid comment command argument");
  }
  // baseConfig.jsonFilePath = "jsonFile" in input && isString(input.j)
  //   ? validateFilePath(await Deno.realPath(resolve(Deno.cwd(), input.j)))
  //   : undefined;
  return {
    json: JSON.parse(input.jsonString),
    // jsonFilePath: undefined
    headSha: input.sha,
    branchName: input.branchName,
  };
}

export { validateCommandLineArgument, alias };
