function replaceMarkdownImagePath(markdown: string, newPath: string): string {
  const regex = /(!\[.*\]\(|<img .*src=").*\/(.*["|\)])/g;
  return markdown.replace(regex, (_, p1, p2) => {
    return `${p1}${newPath}/${p2}`;
  });
}

export { replaceMarkdownImagePath };
