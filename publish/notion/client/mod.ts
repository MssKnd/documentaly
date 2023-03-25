import { Client } from "https://deno.land/x/notion_sdk@v2.2.3/src/mod.ts";
import { BlockTypeObject } from "../types/mod.ts";

function NotionClient(apiKey: string) {
  const notion = new Client({
    auth: apiKey,
  });
  return {
    updatePage: (pageId: string, blockTypeObjects: BlockTypeObject[]) =>
      notion.blocks.children.append({
        block_id: pageId,
        // FIXME
        // deno-lint-ignore no-explicit-any
        children: blockTypeObjects as any,
      }),
  };
}

export { NotionClient };
