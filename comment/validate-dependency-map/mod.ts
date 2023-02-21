import {
  validateFilePath,
  validateMarkdownFilePath,
} from "../../utilities/path/mod.ts";
import {
  isArray,
  isBoolean,
  isObject,
  isString,
} from "../../utilities/type-guard.ts";

function validateDependencyMap(input: unknown) {
  if (!isArray(input)) {
    throw new Error("invalid");
  }
  const map = input.map((item) => {
    if (
      !(
        isObject(item) &&
        "markdownFilePath" in item &&
        isString(item.markdownFilePath) &&
        "changedDependencyFiles" in item &&
        isArray(item.changedDependencyFiles) &&
        "changed" in item &&
        isBoolean(item.changed)
      )
    ) {
      throw new Error("invalid");
    }
    const markdown = {
      filePath: validateMarkdownFilePath(item.markdownFilePath),
      changed: item.changed,
    };
    const filePaths = item.changedDependencyFiles.map((filePath) =>
      validateFilePath(filePath)
    );
    return [markdown, filePaths] as const;
  });
  return new Map(map);
}

export { validateDependencyMap };
