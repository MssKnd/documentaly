import { Color, MetaBlockTypeObject, RichTextObject } from "../types/mod.ts";

function createMetaParagraphBlockTypeObject(
  richTexts: RichTextObject[],
  children?: MetaBlockTypeObject[],
): MetaBlockTypeObject {
  return {
    type: "paragraph",
    paragraph: {
      rich_text: richTexts,
      color: "default",
      children,
    },
  };
}

function createMetaEmptyParagraphBlockTypeObject(): MetaBlockTypeObject {
  return createMetaParagraphBlockTypeObject([]);
}

function createMetaHeadingBlockTypeObject(
  richTexts: RichTextObject[],
  level: number,
  children?: MetaBlockTypeObject[],
): MetaBlockTypeObject {
  const blockTypeObject = {
    rich_text: richTexts,
    color: "default" as Color,
    children,
    is_toggleable: false,
  };
  switch (level) {
    case 1:
      return {
        type: "heading_1",
        heading_1: blockTypeObject,
      };
    case 2:
      return {
        type: "heading_2",
        heading_2: blockTypeObject,
      };
    default:
      return {
        type: "heading_3",
        heading_3: blockTypeObject,
      };
  }
}

function createMetaBulletedListBlockTypeObject(
  richTexts: RichTextObject[],
  children?: MetaBlockTypeObject[],
): MetaBlockTypeObject {
  return {
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: richTexts,
      color: "default",
      children,
    },
  };
}

function createMetaNumberedListBlockTypeObject(
  richTexts: RichTextObject[],
  children?: MetaBlockTypeObject[],
): MetaBlockTypeObject {
  return {
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: richTexts,
      color: "default",
      children,
    },
  };
}

export {
  createMetaBulletedListBlockTypeObject,
  createMetaEmptyParagraphBlockTypeObject,
  createMetaHeadingBlockTypeObject,
  createMetaNumberedListBlockTypeObject,
  createMetaParagraphBlockTypeObject,
};
