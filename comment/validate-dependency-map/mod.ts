import { validateMarkdownFilePath } from "../../utilities/file-path/markdown-file-path.ts";
import { validateFilePath } from "../../utilities/file-path/mod.ts";
import { isObject, isString } from "../../utilities/type-guard.ts";

function validateDependencyMap(input: unknown) {
  if (!Array.isArray(input)) {
    throw new Error("invalid");
  }
  const map = input.map((item) => {
    if (
      !(
        isObject(item) &&
        "markdownFilePath" in item &&
        isString(item.markdownFilePath) &&
        "changedDependencyfiles" in item &&
        Array.isArray(item.changedDependencyfiles)
      )
    ) {
      throw new Error("invalid");
    }
    const markdownFilePath = validateMarkdownFilePath(item.markdownFilePath);
    const filePaths = item.changedDependencyfiles.map((filePath) =>
      validateFilePath(filePath)
    );
    return [markdownFilePath, filePaths] as const;
  });
  return new Map(map);
}

export { validateDependencyMap };
