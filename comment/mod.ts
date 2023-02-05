// import { FilePath } from "../check/search-markdown-files/file-path.ts";
// import { importJsonFile } from "../utilities/import-json-file/import-json-file.ts";
import { validateDependencyMap } from "./validate-dependency-map/mod.ts";

// type DependencyJSON = {
//   markdownFilePath: MarkdonwFilePath;
//   changedDependencyfiles: FilePath[];
// }

function blobUrlBase(branchName: string, headSha: string) {
  return `https://github.com/${branchName}/blob/${headSha}/`;
}

type Props = {
  json: unknown[];
  branchName: string;
  headSha: string;
};

function comment({
  json,
  branchName,
  headSha,
}: Props) {
  // const jsonData = await importJsonFile(jsonFilePath);
  const dependencyMap = validateDependencyMap(json);
  if (dependencyMap.size === 0) {
    console.log("未更新のドキュメントは無いようです 👀");
    return;
  }
  const baseBlobUrl = blobUrlBase(branchName, headSha);
  const result = Array.from(dependencyMap.entries()).map(
    ([markdown, filePaths]) => {
      if (markdown.changed) {
        return `- [x] [${markdown.filePath}](${baseBlobUrl}${markdown.filePath}) updated.\n\n`;
      }
      return `- [ ] 未更新のドキュメント（[${markdown.filePath}](${baseBlobUrl}${markdown.filePath})）に関連した以下のファイルが変更されています。ドキュメントの更新は必要ありませんか？\n${
        filePaths.map((filePath) => `  - ${filePath}\n`).join("")
      }
    `;
    },
  ).join("\n");
  console.log(result);
}

function help() {
  console.info(`documentaly comment help`);
}

export { comment, help };
