import { $ } from "../deps.ts";
import {
  MarkdonwFilePath,
  validateMarkdownFilePath,
} from "../search-markdown-files/markdown-file-path.ts";

async function findMarkdownFilePaths(
  filePaths: string[],
): Promise<MarkdonwFilePath[]> {
  const commands = filePaths.map((filePath) =>
    $`find ${filePath} -name '*.md'`.text()
  );
  const commandResults = await Promise.all(commands);
  return commandResults.flatMap((commandResult) =>
    commandResult.split("\n").map((filePath) =>
      validateMarkdownFilePath(filePath.replace(/^[^\/]*\//, ""))
    )
  );
}

export { findMarkdownFilePaths };
