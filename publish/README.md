# documentaly publish

This GitHub Actions can publish markdown to several platforms.

It uses the documentaly library created by the same developer. See
[here](https://github.com/MssKnd/documentaly) for more details.

# Usage

```yaml
name: documentaly-publish
on:
  pull_request:
    types: [closed]
env:
  BASE_BRANCH: main
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: use documentaly-publish
        uses: mssknd/documentaly-publish@main
        with:
          BASE_BRANCH: ${{ env.BASE_BRANCH }}
          NOTION_API_TOKEN: ${{ secrets.NOTION_API_TOKEN }}
```

# Inputs

| Name                    | Description      | Default | Required |
| ----------------------- | ---------------- | ------- | -------- |
| BASE_BRANCH             | base branch name | main    | no       |
| NOTION_API_TOKEN        |                  | n/a     | no       |
| ZENDESK_API_AUTH_HEADER |                  | n/a     | no       |
