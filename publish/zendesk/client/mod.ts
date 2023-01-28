type UpdateProps = {
  subdomain: string;
  articleId: string;
  locale: string;
  title: string;
  body: string;
};

function ZendeskClient(auth: string) {
  return {
    updatePage: async (
      { subdomain, articleId, locale, title, body }: UpdateProps,
    ) => {
      const json = JSON.stringify({
        translation: { title, body },
      });
      const endpoint =
        `https://${subdomain}.zendesk.com/api/v2/help_center/articles/${articleId}/translations/${locale}.json`;
      // const res =
      await fetch(endpoint, {
        headers: {
          Authorization: `${auth}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: json,
      });
      // console.log(res.body)
    },
  };
}

export { ZendeskClient };
