import { markdownHtmlParser } from "../markdown-html-parser/mod.ts";
import { ZendeskClient } from "./client/mod.ts";
import { validateMarkdownProps } from "./props-validator/mod.ts";

async function publishZendesk(
  zendeskApiAuthHeader: string,
  props: Record<string, unknown>,
  body: string,
) {
  const { title, articleId, subdomain, locale } = validateMarkdownProps(
    props,
  );
  const html = markdownHtmlParser(body);
  const zendeskClient = ZendeskClient(zendeskApiAuthHeader);
  await zendeskClient.updatePage({
    subdomain,
    title,
    body: html,
    articleId,
    locale,
  });
}

export { publishZendesk };
