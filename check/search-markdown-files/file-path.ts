import { Opaque } from "../../utilities/opaque.ts";
import { isString } from "../../utilities/type-guard.ts";

type FilePath = Opaque<"FilePath">;

function validateFilePath(input: unknown) {
  // ここに文字数制限などの条件を記載する。
  if (!isString(input)) {
    throw new Error("invalid file path");
  }
  return input as FilePath;
}

export type { FilePath };
export { validateFilePath };
