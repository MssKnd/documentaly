// import { FilePath } from "../check/search-markdown-files/file-path.ts";
import {
  validateFilePath,
  validateMarkdownFilePath,
} from "../check/search-markdown-files/mod.ts";
// import { importJsonFile } from "../utilities/import-json-file/import-json-file.ts";
import { isObject, isString } from "../utilities/mod.ts";

// type DependencyJSON = {
//   markdownFilePath: MarkdonwFilePath;
//   changedDependencyfiles: FilePath[];
// }

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

function blobUrlBase(branchName: string, headSha: string) {
  return `https://github.com/${branchName}/blob/${headSha}/`;
}

function comment(
  jsonData: unknown[],
  branchName: string,
  headSha: string,
) {
  // const jsonData = await importJsonFile(jsonFilePath);
  const dependencyMap = validateDependencyMap(jsonData);
  if (dependencyMap.size === 0) {
    console.log("未更新のドキュメントは無いようです 👀");
    return;
  }
  const baseBlobUrl = blobUrlBase(branchName, headSha);
  const result = Array.from(dependencyMap.entries()).map(
    ([markdownFilePath, filePaths]) => {
      return `未更新のドキュメント（[${markdownFilePath}](${baseBlobUrl}${markdownFilePath})）に関連した以下のファイルが変更されています。ドキュメントの更新は必要ありませんか？\n${
        filePaths.map((filePath) => `- ${filePath}\n`).join("")
      }
    `;
    },
  ).join("\n\n");
  console.log(result);
}

export { comment };
