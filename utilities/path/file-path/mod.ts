import { Opaque } from "../../opaque.ts";
import { isString } from "../../type-guard.ts";

type FilePath = Opaque<"FilePath">;

function validateFilePath(input: unknown) {
  if (!isString(input) || input === "") {
    throw new Error("invalid file path");
  }
  // assertain wildcard path
  // // only check (async)
  // Deno.stat(input).catch(
  //   (error) => {
  //     if (error instanceof Deno.errors.NotFound) {
  //       console.warn(`"${input}" was not found`);
  //     } else {
  //       throw error;
  //     }
  //   },
  // );

  return input as FilePath;
}

export type { FilePath };
export { validateFilePath };
