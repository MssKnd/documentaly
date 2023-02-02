---
dependentFilePaths: ['./publish']
---

# documentaly publish

Can publish markdown to some platforms. For example notion, Zendesk.

## process

![publish process](./images/publish-process.drawio.svg)

### convert
- parse markdown<br>Parse markdown to html or json string that depend on output destination.
- replace image url<br>Replace relative image url to absolute image url.

### publish
Publish to some platforms.
