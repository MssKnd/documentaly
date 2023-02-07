import { yaml } from "../../deps.ts";

function yamlParser(yamlString: string) {
  return yaml.parse(yamlString) ?? {};
}

export { yamlParser };
