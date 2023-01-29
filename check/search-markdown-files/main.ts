import { yaml } from "../../deps.ts";
import { $ } from "../deps.ts";
import { FilePath } from "../file-path/mod.ts";
import {
  DependencyConfig,
  validateDependencyConfig,
} from "../dependency-config/mod.ts";
import {
  MarkdonwFilePath,
  validateMarkdownFilePath,
} from "./markdown-file-path.ts";
import { extructYamlHeader } from "../../utilities/extruct-yaml-header/mod.ts";

async function findMarkdownFilePath(
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

async function markdownFilePathConfigMap(
  markdownFilePaths: MarkdonwFilePath[],
) {
  const markdownFilePathAndConfigTaples = await Promise.all(
    markdownFilePaths.map(async (markdownFilePath) => {
      const markdown = await Deno.readTextFile(markdownFilePath);
      const { yamlHeader } = extructYamlHeader(markdown);
      const config = yaml.parse(yamlHeader) ?? {};
      const validateCondig = validateDependencyConfig(config);
      return [markdownFilePath, validateCondig] as const;
    }),
  );
  return new Map(markdownFilePathAndConfigTaples);
}

function reverseDependencyMap(
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

/**
 * Search markdown file then map file path and dependency configuration.
 * @param filePaths
 * @returns
 */
async function main(filePaths: string[]) {
  const markdownFilePaths = await findMarkdownFilePath(filePaths);
  return markdownFilePathConfigMap(markdownFilePaths);
}

export { main as documentDependencies, reverseDependencyMap };
