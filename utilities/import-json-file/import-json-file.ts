import { FilePath } from "../../check/file-path/mod.ts";

async function importJsonFile(filePath: FilePath) {
  const { default: data } = await import(filePath, {
    assert: { type: "json" },
  });
  return data;
}

export { importJsonFile };
