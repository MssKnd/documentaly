import { isObject, isString } from "../../utilities/type-guard.ts";
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
  // TODO: include validateMarkdownProps
  const mediaBaseUrl = hasImageUrlReplacementPath(props) ? props.imageUrlReplacementPath : undefined;
  const html = markdownHtmlParser(body, mediaBaseUrl);
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

const hasImageUrlReplacementPath = (
  x: unknown,
): x is { imageUrlReplacementPath: string } & Record<string, unknown> =>
  isObject(x) && ("imageUrlReplacementPath" in x) &&
  isString(x.imageUrlReplacementPath);

export { publishZendesk };
