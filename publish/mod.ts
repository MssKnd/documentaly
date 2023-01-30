import { FilePath } from "../check/file-path/mod.ts";
import { markdownPropsParser } from "./markdown-props-parser/mod.ts";
import { publishNotion } from "./notion/mod.ts";
import { publishZendesk } from "./zendesk/mod.ts";

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
    const { props, body } = await markdownPropsParser(filePath).catch(
      (error) => {
        if (error instanceof Deno.errors.NotFound) {
          console.error(`"${filePath}" was not found`);
          return { props: { dist: "" }, body: "" }; // skip
        }
        throw error;
      },
    );
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

function help() {
  console.info(`documentaly publish help`);
}

export { help, publish };
