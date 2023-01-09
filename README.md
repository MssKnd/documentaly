---
dependentFilePaths: ['.']
---

# documentaly (Beta)

This GitHub Action reminds pull request reviewers to check the related
documentation with the PR . It helps ensure that all documentation is up-to-date
and consistent with the code changes. Simply add the action to your workflow and
configure the trigger as needed.

# setup Github Actions

`.github/workflows/documentaly.yml`

```yaml
name: documentaly
on: pull_request
env:
  BASE_BRANCH: main
jobs:
  check_and_comment:
    runs-on: ubuntu-latest
    steps:
      - name: documentaly
        uses: mssknd/documentaly@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          base_branch: ${{ env.BASE_BRANCH }}
```

# setup document (markdown)

```
---
dependentFilePaths: ['.']
---

# Title of Markdown

description.

```
