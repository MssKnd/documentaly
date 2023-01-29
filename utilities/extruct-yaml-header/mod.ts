function extructYamlHeader(markdown: string) {
  const headerRegex = /^---$\n(?<props>[\s\S]*?)\n^---$(?<body>[\s\S]*)/m;
  const matchResult = markdown.match(headerRegex);
  return {
    yamlHeader: matchResult?.groups?.props ?? "",
    body: matchResult?.groups?.body ?? "",
  };
}

export { extructYamlHeader };
