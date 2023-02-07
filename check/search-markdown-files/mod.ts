import {
  DependencyConfig,
  validateDependencyConfig,
} from "../dependency-config/mod.ts";
import { extructYamlHeader } from "../../utilities/extruct-yaml-header/mod.ts";
import { MarkdonwFilePath, RegExpPath } from "../../utilities/path/mod.ts";
import { yamlParser } from "../../utilities/yaml-parser/mod.ts";

async function markdownFilePathConfigMap(
  markdownFilePaths: MarkdonwFilePath[],
) {
  const markdownFilePathAndConfigTaples = await Promise.all(
    markdownFilePaths.map(async (markdownFilePath) => {
      const markdown = await Deno.readTextFile(markdownFilePath);
      const { yamlHeader } = extructYamlHeader(markdown);
      const config = yamlParser(yamlHeader);
      const validateCondig = validateDependencyConfig(config);
      return [markdownFilePath, validateCondig] as const;
    }),
  );
  return new Map(markdownFilePathAndConfigTaples);
}

function reverseDependencyMap(
  map: Map<MarkdonwFilePath, DependencyConfig>,
): Map<RegExpPath, Set<MarkdonwFilePath>> {
  const reversedMap = new Map<RegExpPath, Set<MarkdonwFilePath>>();

  for (const [markdownFilePath, dependencyConfig] of map.entries()) {
    dependencyConfig.dependentFilePaths.forEach((dependentFilePath) => {
      if (reversedMap.has(dependentFilePath)) {
        reversedMap.get(dependentFilePath)?.add(markdownFilePath);
      } else {
        reversedMap.set(dependentFilePath, new Set([markdownFilePath]));
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
function documentDependencies(markdownFilePaths: MarkdonwFilePath[]) {
  return markdownFilePathConfigMap(markdownFilePaths);
}

export { documentDependencies, reverseDependencyMap };
