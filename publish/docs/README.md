---
dependentFilePaths: ['./publish']
---

# documentaly publish

Can publish markdown to some platforms. For example Notion, Zendesk.

## process

![publish process](./images/publish-process.drawio.svg)

### convert

- parse markdown<br>Parse markdown to html or json string that depend on output
  destination.
- replace image url<br>Replace relative image url to absolute image url.

### publish

Publish to some platforms.

# comand line argument

## zendesk

| key                       | description                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| --zendesk-api-auth-header | `Authorization: <here>`.<br/> [Detail is here.](https://developer.zendesk.com/api-reference/introduction/security-and-auth/) |

## Notion

| key              | description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| --notion-api-key | Integration token.<br/> [Detail is here.](https://developers.notion.com/docs/authorization) |

# markdown props

## base props

| name                    | type   | description                                                       |
| ----------------------- | ------ | ----------------------------------------------------------------- |
| dist                    | string | Name of platform on which to publish.</br>ex. `Notion`, `zendesk` |
| imageUrlReplacementPath | string | Path of the image URL to be replaced                              |

## Zendesk props

| name      | type    | description |
| --------- | ------- | ----------- |
| subdomain | string  |             |
| articleId | string  |             |
| locale    | string  |             |
| draft     | boolean |             |
| title     | string  |             |

## Notion props

| name   | type   | description |
| ------ | ------ | ----------- |
| pageId | string |             |
| title  | string |             |
