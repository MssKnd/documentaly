import { isObject } from "../../utilities/mod.ts";
import { FilePath, validateFilePath } from "../file-path/mod.ts";

/** Markdown header has DependencyConfig */
type DependencyConfig = {
  dependentFilePaths: FilePath[];
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
      validateFilePath(filePath)
    ),
  };
}

export type { DependencyConfig };
export { validateDependencyConfig };
