import { gfm } from "../deps.ts";

function markdownHtmlParser(markdown: string) {
  return gfm.render(markdown);
}

export { markdownHtmlParser };
