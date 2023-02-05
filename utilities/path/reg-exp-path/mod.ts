import { Opaque } from "../../opaque.ts";
import { isString } from "../../type-guard.ts";

type RegExpPath = Opaque<"RegExpPath">;

function validateRegExpPath(input: unknown) {
  if (!isString(input) || input === "") {
    throw new Error("invalid reg exp path");
  }

  return input as RegExpPath;
}

export type { RegExpPath };
export { validateRegExpPath };
