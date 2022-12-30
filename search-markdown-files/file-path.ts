import { Opaque } from "../utilities/opaque.ts";

type FilePath = Opaque<"FilePath">;

function validateFilePath(input: unknown) {
  // ここに文字数制限などの条件を記載する。本記事の趣旨ではないため割愛
  if (!isString(input)) {
    throw new Error("invalid file path");
  }
  return input as FilePath;
}

function isString(value: unknown): value is string {
  if (typeof value === "string" || value instanceof String) {
    return true;
  } else {
    return false;
  }
}

export type { FilePath };
export { validateFilePath };
