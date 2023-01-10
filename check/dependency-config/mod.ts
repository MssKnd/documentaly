import { isObject } from "../../utilities/mod.ts";
import { FilePath, validateFilePath } from "../file-path/mod.ts";

/** Markdown header has DependencyConfig */
type DependencyConfig = {
  dependentFilePaths: FilePath[];
  // author: string; // TODO
};

function validateDependencyConfig(input: unknown): DependencyConfig {
  const baseConfig: DependencyConfig = {
    dependentFilePaths: [],
  };
  if (!isObject(input)) {
    throw new Error("invalid markdown dependency config");
  }
  if (
    "dependentFilePaths" in input && Array.isArray(input.dependentFilePaths)
  ) {
    baseConfig.dependentFilePaths = input.dependentFilePaths.map((filePath) =>
      validateFilePath(filePath)
    );
  }
  return baseConfig;
}

export type { DependencyConfig };
export { validateDependencyConfig };
