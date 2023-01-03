import { FilePath } from "../../check/search-markdown-files/mod.ts";

async function importJsonFile(filePath: FilePath) {
  const { default: data } = await import(filePath, {
    assert: { type: "json" },
  });
  return data;
}

export { importJsonFile };
