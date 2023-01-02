---
dependentFilePaths: ['filename']
---

```mermaid
graph
  a(Get configuration) --> b(Search files)
  a --> d(Arrange git diff)
  b --> c(Arrange dipendency)
  c --> e(Compare dipendency and git diff)
  d --> e
  e --> output
```
