import { yaml } from "../../deps.ts";
import { FilePath } from "../../utilities/file-path/mod.ts";
import {
  DependencyConfig,
  validateDependencyConfig,
} from "../dependency-config/mod.ts";
import { MarkdonwFilePath } from "./markdown-file-path.ts";
import { extructYamlHeader } from "../../utilities/extruct-yaml-header/mod.ts";

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
function main(markdownFilePaths: MarkdonwFilePath[]) {
  return markdownFilePathConfigMap(markdownFilePaths);
}

export { main as documentDependencies, reverseDependencyMap };
