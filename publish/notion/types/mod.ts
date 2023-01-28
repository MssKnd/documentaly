type BlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "child_page"
  | "child_database"
  | "embed"
  | "image"
  | "video"
  | "file"
  | "pdf"
  | "bookmark"
  | "callout"
  | "quote"
  | "equation"
  | "divider"
  | "table_of_contents"
  | "column"
  | "column_list"
  | "link_preview"
  | "synced_block"
  | "template"
  | "link_to_page"
  | "table"
  | "table_row"
  | "unsupported";

type Color =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

type RichTextType = "text" | "mention" | "equation";

type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: Color;
};
type RichTextObjectBase<T extends RichTextType> = {
  type: T;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

type RichTextObjectText =
  & RichTextObjectBase<"text">
  & {
    text: {
      content: string;
      link: { url: string } | null;
    };
  };
type RichTextObjectMention = RichTextObjectBase<"mention">;
type RichTextObjectEquation = RichTextObjectBase<"equation">;
type RichTextObject =
  | RichTextObjectText
  | RichTextObjectMention
  | RichTextObjectEquation;

type CommonBlockTypeObject = {
  rich_text: RichTextObject[];
  color: Color;
  children?: MetaBlockTypeObject[];
};

type Toggleable = {
  is_toggleable: boolean;
};

type BaseBlockTypeObject<T extends BlockType> = T extends `heading_${number}`
  ? {
    [key in T]: CommonBlockTypeObject & Toggleable;
  }
  : {
    [key in T]: CommonBlockTypeObject;
  };

type BlockTypeObject =
  | BaseBlockTypeObject<"paragraph">
  | BaseBlockTypeObject<"heading_1">
  | BaseBlockTypeObject<"heading_2">
  | BaseBlockTypeObject<"heading_3">
  | BaseBlockTypeObject<"bulleted_list_item">
  | BaseBlockTypeObject<"numbered_list_item">;

type BaseMetaBlockTypeObject<T extends BlockType> = {
  type: T;
} & BaseBlockTypeObject<T>;

type MetaBlockTypeObject =
  | BaseMetaBlockTypeObject<"paragraph">
  | BaseMetaBlockTypeObject<"heading_1">
  | BaseMetaBlockTypeObject<"heading_2">
  | BaseMetaBlockTypeObject<"heading_3">
  | BaseMetaBlockTypeObject<"bulleted_list_item">
  | BaseMetaBlockTypeObject<"numbered_list_item">;

export type {
  Annotations,
  BlockType,
  BlockTypeObject,
  Color,
  MetaBlockTypeObject,
  RichTextObject,
  RichTextObjectEquation,
  RichTextObjectMention,
  RichTextObjectText,
  RichTextType,
};
