import { Opaque } from "../../utilities/opaque.ts";
import { isString } from "../../utilities/type-guard.ts";

type FilePath = Opaque<"FilePath">;

function validateFilePath(input: unknown) {
  if (!isString(input)) {
    throw new Error("invalid file path");
  }
  return input as FilePath;
}

export type { FilePath };
export { validateFilePath };
