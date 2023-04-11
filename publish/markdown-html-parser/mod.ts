import { gfm } from "../deps.ts";

function markdownHtmlParser(markdown: string, mediaBaseUrl?: string) {
  return gfm.render(markdown, {
    mediaBaseUrl,
  });
}

export { markdownHtmlParser };
