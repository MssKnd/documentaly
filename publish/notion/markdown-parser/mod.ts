import {
  Token,
  tokens,
} from "https://deno.land/x/rusty_markdown@v0.4.1/mod.ts";
import { annotationState } from "../annotation-state/mod.ts";
import { linkState } from "../link-state/mod.ts";
import { listStack } from "../list-stack/mod.ts";
import { richTextStack } from "../rich-text-stack/mod.ts";
import {
  createMetaBulletedListBlockTypeObject,
  createMetaEmptyParagraphBlockTypeObject,
  createMetaHeadingBlockTypeObject,
  createMetaNumberedListBlockTypeObject,
  createMetaParagraphBlockTypeObject,
} from "../block-type-object/mod.ts";
import { BlockTypeObject, MetaBlockTypeObject } from "../types/mod.ts";
import { createTextObject } from "../create-rich-text.ts";

function startProcess(token: Token) {
  if (token.type !== "start") {
    throw Error("invalid token type.");
  }
  switch (token.tag) {
    case "list":
      richTextStack.pushLevel();
      if (token.startNumber) {
        listStack.push("numbered");
        return [];
      }
      listStack.push("bulleted");
      return [];
    case "strong":
      annotationState.bold();
      return [];
    case "strikethrough":
      annotationState.strikethrough();
      return [];
    case "link":
      linkState.set(token.url);
      return [];
    default:
      // tokenStack.push(token);
      return [];
  }
}

function endProcess(token: Token): MetaBlockTypeObject | MetaBlockTypeObject[] {
  if (token.type !== "end") {
    throw Error("invalid token type.");
  }
  // tokenStack.pop();
  switch (token.tag) {
    case "paragraph":
      return createMetaParagraphBlockTypeObject(richTextStack.popAll());
    case "heading":
      return createMetaHeadingBlockTypeObject(
        richTextStack.popAll(),
        token.level,
      );
    case "list":
      richTextStack.popLevel();
      if (listStack.currentLevel() === 1) {
        return listStack.popItems() ?? [];
      }
      if (listStack.currentType() === "numbered") {
        listStack.pushItem(
          createMetaNumberedListBlockTypeObject(
            richTextStack.popAll(),
            listStack.popItems(),
          ),
        );
        return [];
      }
      listStack.pushItem(
        createMetaBulletedListBlockTypeObject(
          richTextStack.popAll(),
          listStack.popItems(),
        ),
      );
      return [];
    case "listItem": {
      const richTextObjects = richTextStack.popAll();
      if (richTextObjects.length === 0) {
        return [];
      }
      if (listStack.currentType() === "numbered") {
        listStack.pushItem(
          createMetaNumberedListBlockTypeObject(richTextObjects),
        );
        return [];
      }
      listStack.pushItem(
        createMetaBulletedListBlockTypeObject(richTextObjects),
      );
      return [];
    }
    case "strong":
      annotationState.unBold();
      return [];
    case "strikethrough":
      annotationState.unStrikethrough();
      return [];
    case "link":
      linkState.clear();
      return [];
    default:
      return [];
  }
}

function markdownParser(markdown: string): BlockTypeObject[] {
  const tokenized = tokens(markdown, { strikethrough: true });
  const blockTypeObjects = tokenized.flatMap((token) => {
    switch (token.type) {
      case "start":
        return startProcess(token);
      case "text": {
        richTextStack.push(
          createTextObject({
            content: token.content,
            link: linkState.get(),
            annotations: annotationState.get(),
            href: null,
          }),
        );
        return [];
      }
      case "softBreak":
        richTextStack.appendSoftBreak();
        return [];
      case "end": {
        return endProcess(token);
      }
      default:
        return [];
    }
  }).flatMap(
    (metaBlockTypeObject: MetaBlockTypeObject, index, metaBlockTypeObjects) => {
      const { type, ...object } = metaBlockTypeObject;
      if (
        type === "paragraph" &&
        metaBlockTypeObjects[index - 1]?.type === "paragraph"
      ) {
        const { type: _type, ...emptyParagraphBlockTypeObject } =
          createMetaEmptyParagraphBlockTypeObject();
        return [emptyParagraphBlockTypeObject, object];
      }
      return object;
    },
  );

  return blockTypeObjects;
}

export { markdownParser };
