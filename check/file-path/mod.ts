import { Opaque } from "../../utilities/opaque.ts";
import { isString } from "../../utilities/type-guard.ts";

type FilePath = Opaque<"FilePath">;

function validateFilePath(input: unknown) {
  if (!isString(input) || input === "") {
    throw new Error("invalid file path");
  }
  // only check (async)
  Deno.stat(input).catch(
    (error) => {
      if (error instanceof Deno.errors.NotFound) {
        console.warn(`"${input}" was not found`);
      } else {
        throw error;
      }
    },
  );

  return input as FilePath;
}

export type { FilePath };
export { validateFilePath };
