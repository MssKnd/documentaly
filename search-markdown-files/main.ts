import $ from "https://deno.land/x/dax@0.17.0/mod.ts";
import { parse as yamlParse } from "https://deno.land/std@0.170.0/encoding/yaml.ts";
import { FilePath, validateFilePath } from "./file-path.ts";
import {
  DependencyConfig,
  validateDependencyConfig,
} from "./dependency-config.ts";

async function findMarkdownFilePath(filePaths: string[]): Promise<FilePath[]> {
  const commands = filePaths.map((filePath) =>
    $`find ${filePath} -name '*.md'`.text()
  );
  const commandResults = await Promise.all(commands);
  return commandResults.flatMap((commandResult) =>
    commandResult.split("\n").map((filePath) => validateFilePath(filePath))
  );
}

/** extract YAML header from markdown file */
function extructYamlHeader(markdownFilePath: FilePath): Promise<string> {
  return $`awk '/^---$/ {p=!p; if (p) {next}; if (!p) {exit}} {if (!p) {exit}} 1' ${markdownFilePath}`
    .text();
}

async function markdownFilePathConfigMap(markdownFilePaths: FilePath[]) {
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
  map: Map<FilePath, DependencyConfig>,
): Map<FilePath, FilePath[]> {
  const reversedMap = new Map<FilePath, FilePath[]>();

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
