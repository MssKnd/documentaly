import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";
import { validateFilePath } from "../search-markdown-files/file-path.ts";
import { validateMarkdownFilePath } from "../search-markdown-files/markdown-file-path.ts";
import { isObject, isString } from "../utilities/type-guard.ts";

// type DependencyJSON = {
//   markdownFilePath: MarkdonwFilePath;
//   changedDependencyfiles: FilePath[];
// }

function validateDependencyMap(input: unknown) {
  // const dependencyMap = new Map<MarkdonwFilePath, FilePath[]>()
  if (!isString(input)) {
    throw new Error("invalid");
  }
  const json = JSON.parse(input);
  if (!Array.isArray(json)) {
    throw new Error("invalid");
  }
  const map = json.map((item) => {
    // const taple: [MarkdonwFilePath, FilePath[]] = []
    // if (!isObject(item)) {
    //   throw new Error("invalid")
    // }
    if (
      !(
        isObject(item) &&
        "markdownFilePath" in item &&
        isString(item.markdownFilePath) &&
        "changedDependencyfiles" in item &&
        Array.isArray(item)
      )
    ) {
      throw new Error("invalid");
    }
    const markdownFilePath = validateMarkdownFilePath(item.markdownFilePath);
    const filePaths = item.map((filePath) => validateFilePath(filePath));
    return [markdownFilePath, filePaths] as const;
  });
  return new Map(map);
}

function main(json: unknown) {
  const dependencyMap = validateDependencyMap(json);
  if (dependencyMap.size > 0) {
    return "未変更のドキュメントはありません";
  }
  return Array.from(dependencyMap.entries()).map(
    ([markdownFilePath, filePaths]) => {
      return `
      未変更のドキュメント（${markdownFilePath}）に関連している以下のファイルが変更されています。
      ${filePaths.map((filePath) => `- ${filePath}\n`)}
    `;
    },
  );
}

const {
  j: json,
} = parse(Deno.args);

console.log(main(json));
