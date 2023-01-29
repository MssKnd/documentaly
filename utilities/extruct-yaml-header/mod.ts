function extructYamlHeader(markdown: string) {
  const headerRegex = /^---$\n(?<props>[\s\S]*?)\n^---$(?<body>[\s\S]*)/m;
  const matchResult = markdown.match(headerRegex);
  const yamlHeader = matchResult?.groups?.props ?? "";
  const body = yamlHeader ? matchResult?.groups?.body?.trim() ?? "" : markdown;
  return {
    yamlHeader,
    body,
  };
}

export { extructYamlHeader };
