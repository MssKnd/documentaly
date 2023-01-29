import { yaml } from "../../deps.ts";
import { FilePath } from "../../check/file-path/mod.ts";
import { isObject, isString } from "../../utilities/type-guard.ts";
import { extructYamlHeader } from "../../utilities/extruct-yaml-header/mod.ts";

const hasDistObject = (
  x: unknown,
): x is { dist: string } & Record<string, unknown> =>
  isObject(x) && ("dist" in x) && isString(x.dist);

async function markdownPropsParser(filePath: FilePath) {
  const markdown = await Deno.readTextFile(filePath);

  const { yamlHeader, body } = extructYamlHeader(markdown);
  const parsedProps = yaml.parse(yamlHeader) ?? {};

  if (!hasDistObject(parsedProps)) {
    return {
      props: { dist: "" },
      body,
    };
  }

  return { props: parsedProps, body };
}

export { markdownPropsParser };
