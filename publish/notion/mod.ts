import { NotionClient } from "./client/mod.ts";
import { markdownParser } from "./markdown-parser/mod.ts";
import { validateMarkdownProps } from "./props-validator/mod.ts";

async function publishNotion(
  notionApiKey: string,
  props: Record<string, unknown>,
  body: string,
) {
  const { pageId, title } = validateMarkdownProps(props);
  const blockTypeObjects = markdownParser(body);
  const notionClient = NotionClient(notionApiKey);
  await notionClient.updatePage(pageId, blockTypeObjects);
  console.log(`"${title}" updated 🚀`);
}

export { publishNotion };
