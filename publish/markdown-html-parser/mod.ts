import { rustyMarkdown } from "../deps.ts";

function markdownHtmlParser(markdown: string) {
  const tokenized = rustyMarkdown.tokens(markdown, { strikethrough: true });
  return rustyMarkdown.html(tokenized);
}

export { markdownHtmlParser };
