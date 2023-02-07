---
dependentFilePaths: ['.']
---

# documentaly (Beta)

This GitHub Action reminds pull request reviewers to check the related
documentation with the PR . It helps ensure that all documentation is up-to-date
and consistent with the code changes. Simply add the action to your workflow and
configure the trigger as needed.

# Usage

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
          BASE_BRANCH: ${{ env.BASE_BRANCH }}
```

# Inputs

| Name         | Description             | Default | Required |
| ------------ | ----------------------- | ------- | -------- |
| BASE_BRANCH  | base branch name        | main    | no       |
| MARKDOWN_DIR | markdown directory path | .       | no       |

# Outputs

TODO

# setup document (markdown)

Fill in the dependent file path at the beginning of the markdown file.

```md
---
dependentFilePaths: ['.']
---

# Title of Markdown

description.
```
