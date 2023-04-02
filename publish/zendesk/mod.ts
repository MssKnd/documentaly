import { markdownHtmlParser } from "../markdown-html-parser/mod.ts";
import { ZendeskClient } from "./client/mod.ts";
import { validateMarkdownProps } from "./props-validator/mod.ts";

async function publishZendesk(
  zendeskApiAuthHeader: string,
  props: Record<string, unknown>,
  body: string,
  dryRun = false,
) {
  const { title, articleId, subdomain, locale } = validateMarkdownProps(
    props,
  );
  const html = markdownHtmlParser(body);
  const zendeskClient = ZendeskClient(zendeskApiAuthHeader);
  if (dryRun) {
    console.log(
      `[DryRun]\n"[${title}](${articleId})" updated at ${new Date()} 🚀`,
    );
    return;
  }
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
