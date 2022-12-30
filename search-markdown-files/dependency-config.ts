import { FilePath, validateFilePath } from "./file-path.ts";

type DependencyConfig = {
  dependentFilePaths: FilePath[];
};

function validateDependencyConfig(input: unknown) {
  const baseConfig: DependencyConfig = {
    dependentFilePaths: [],
  };
  if (!isObject(input)) {
    throw new Error();
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

const isObject = (x: unknown): x is Record<string, unknown> =>
  x !== null && (typeof x === "object" || typeof x === "function");

export type { DependencyConfig };
export { validateDependencyConfig };
