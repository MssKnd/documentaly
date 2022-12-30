import $ from "https://deno.land/x/dax@0.17.0/mod.ts";
import { parse as yamlParse } from "https://deno.land/std@0.170.0/encoding/yaml.ts";
import { FilePath } from "./file-path.ts";
import {
  DependencyConfig,
  validateDependencyConfig,
} from "./dependency-config.ts";
import {
  MarkdonwFilePath,
  validateMarkdownFilePath,
} from "./markdown-file-path.ts";

async function findMarkdownFilePath(
  filePaths: string[],
): Promise<MarkdonwFilePath[]> {
  const commands = filePaths.map((filePath) =>
    $`find ${filePath} -name '*.md'`.text()
  );
  const commandResults = await Promise.all(commands);
  return commandResults.flatMap((commandResult) =>
    commandResult.split("\n").map((filePath) =>
      validateMarkdownFilePath(filePath)
    )
  );
}

/** extract YAML header from markdown file */
function extructYamlHeader(
  markdownFilePath: MarkdonwFilePath,
): Promise<string> {
  return $`awk '/^---$/ {p=!p; if (p) {next}; if (!p) {exit}} {if (!p) {exit}} 1' ${markdownFilePath}`
    .text();
}

async function markdownFilePathConfigMap(
  markdownFilePaths: MarkdonwFilePath[],
) {
  const markdownFilePathAndConfigTaples = await Promise.all(
    markdownFilePaths.map(async (markdownFilePath) => {
      const yamlHeader = await extructYamlHeader(markdownFilePath);
      const config = yamlParse(yamlHeader) ?? {};
      const validateCondig = validateDependencyConfig(config);
      return [markdownFilePath, validateCondig] as const;
    }),
  );
  return new Map(markdownFilePathAndConfigTaples);
}

function reverseMap(
  map: Map<MarkdonwFilePath, DependencyConfig>,
): Map<FilePath, MarkdonwFilePath[]> {
  const reversedMap = new Map<FilePath, MarkdonwFilePath[]>();

  for (const [key, value] of map.entries()) {
    const config = validateDependencyConfig(value);
    config.dependentFilePaths.forEach((val) => {
      if (reversedMap.has(val)) {
        reversedMap.get(val)?.push(key);
      } else {
        reversedMap.set(val, [key]);
      }
    });
  }

  return reversedMap;
}

async function main() {
  const markdownFilePaths = await findMarkdownFilePath(["."]);
  const map = await markdownFilePathConfigMap(markdownFilePaths);
  return {
    filePathDependencyMap: map,
    // dependencyFilePath: reverseMap(map as any),
  };
}

export { main as documentDependencies, reverseMap };
