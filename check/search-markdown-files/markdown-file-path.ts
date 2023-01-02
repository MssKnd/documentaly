import { Opaque } from "../../utilities/opaque.ts";
import { FilePath, validateFilePath } from "./file-path.ts";

type MarkdonwFilePath = Opaque<"MarkdonwFilePath">;

function validateMarkdownFilePath(input: unknown) {
  const filePath = validateFilePath(input);
  if (!hasMarkdownExtention(filePath)) {
    // TODO: will change Result Type
    throw new Error("invalid markdown file path");
  }
  return input as MarkdonwFilePath;
}

const hasMarkdownExtention = (filePath: FilePath) =>
  filePath.trim().endsWith(".md");

export type { MarkdonwFilePath };
export { hasMarkdownExtention, validateMarkdownFilePath };