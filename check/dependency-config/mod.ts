import { isObject } from "../../utilities/mod.ts";
import { RegExpPath, validateRegExpPath } from "../../utilities/path/mod.ts";

/** Markdown header has DependencyConfig */
type DependencyConfig = {
  dependentFilePaths: RegExpPath[];
  // author: string; // TODO
};

function validateDependencyConfig(input: unknown): DependencyConfig {
  if (!isObject(input)) {
    throw new Error("invalid markdown dependency config");
  }

  if (
    !("dependentFilePaths" in input) || !Array.isArray(input.dependentFilePaths)
  ) {
    return {
      dependentFilePaths: [],
    };
  }

  return {
    dependentFilePaths: input.dependentFilePaths.map((filePath) =>
      validateRegExpPath(filePath)
    ),
  };
}

export type { DependencyConfig };
export { validateDependencyConfig };
