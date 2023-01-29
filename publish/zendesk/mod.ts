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
  // TODO: error handling
  const res = await zendeskClient.updateArticle({
    subdomain,
    title,
    body: html,
    articleId,
    locale,
  });
  const {
    translation: {
      html_url: articleUrl,
      updated_at: updatedAt,
    },
  } = await res.json();
  console.log(`"[${title}](${articleUrl})" updated at ${updatedAt} 🚀`);
}

export { publishZendesk };
