import { NotionClient } from "./client/mod.ts";
import { markdownParser } from "./markdown-parser/mod.ts";
import { validateMarkdownProps } from "./props-validator/mod.ts";

async function publishNotion(
  notionApiKey: string,
  props: Record<string, unknown>,
  body: string,
  dryRun = false,
) {
  const { pageId, title } = validateMarkdownProps(props);
  const blockTypeObjects = markdownParser(body);
  if (dryRun) {
    console.log(`[DryRun]\n"${title}" updated at ${new Date()} 🚀`);
    return;
  }
  const notionClient = NotionClient(notionApiKey);
  await notionClient.updatePage(pageId, blockTypeObjects);
  console.log(`"${title}" updated at ${new Date()} 🚀`);
}

export { publishNotion };
