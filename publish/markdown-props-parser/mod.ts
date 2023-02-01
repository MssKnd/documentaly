import { yaml } from "../../deps.ts";
import { isObject } from "../../utilities/type-guard.ts";
import { extructYamlHeader } from "../../utilities/extruct-yaml-header/mod.ts";

function markdownPropsParser(markdown: string) {
  const { yamlHeader, body } = extructYamlHeader(markdown);
  const parsedProps = yaml.parse(yamlHeader) ?? {};

  if (!isObject(parsedProps)) {
    throw new Error("invalid markdown");
  }

  return { props: parsedProps, body };
}

export { markdownPropsParser };
