import { isObject, isString } from "../utilities/type-guard.ts";
import { FilePath } from "../utilities/file-path/mod.ts";
import { markdownPropsParser } from "./markdown-props-parser/mod.ts";
import { publishNotion } from "./notion/mod.ts";
import { publishZendesk } from "./zendesk/mod.ts";
import { replaceMarkdownImagePath } from "./replace-markdown-image-path/mod.ts";

type Props = {
  filePaths: FilePath[];
  zendeskApiAuthHeader?: string;
  notionApiKey?: string;
};

function publish({ filePaths, zendeskApiAuthHeader, notionApiKey }: Props) {
  if (filePaths.length === 0) {
    console.info("No change files.");
    return;
  }
  filePaths.map(async (filePath) => {
    const markdown = await Deno.readTextFile(filePath).catch(
      (error) => {
        if (error instanceof Deno.errors.NotFound) {
          console.error(`"${filePath}" was not found`);
          return ""; // skip
        }
        throw error;
      },
    );

    if (markdown === "") {
      console.info(`skip: ${filePath}`);
      return;
    }

    const { props, body: unreplacedBody } = markdownPropsParser(markdown);

    if (!hasDist(props)) {
      console.info(`skip: ${filePath}`);
      return;
    }

    const body = hasImageUrlReplacementPath(props)
      ? replaceMarkdownImagePath(unreplacedBody, props.imageUrlReplacementPath)
      : unreplacedBody;

    switch (props.dist.toLocaleLowerCase()) {
      case "zendesk":
        if (!zendeskApiAuthHeader) {
          throw Error(
            "need Zendesk API authotization header (base64 encoded).",
          );
        }
        publishZendesk(zendeskApiAuthHeader, props, body);
        break;
      case "notion":
        if (!notionApiKey) {
          throw Error("need notion API key.");
        }
        publishNotion(notionApiKey, props, body);
        break;
      default:
        console.info(`skip: ${filePath}`);
        break;
    }
  });
}

const hasDist = (
  x: unknown,
): x is { dist: string } & Record<string, unknown> =>
  isObject(x) && ("dist" in x) && isString(x.dist);

const hasImageUrlReplacementPath = (
  x: unknown,
): x is { imageUrlReplacementPath: string } & Record<string, unknown> =>
  isObject(x) && ("imageUrlReplacementPath" in x) &&
  isString(x.imageUrlReplacementPath);

function help() {
  console.info(`documentaly publish help`);
}

export { help, publish };
