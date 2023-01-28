import { Annotations, RichTextObjectText } from "./types/mod.ts";

// function create(type: RichTextType, ...args: TextObjectProps): RichTextObject {
//   switch (type) {
//     case "text":
//       return createTextObject();
//     default:
//       break;
//   }
// }

type TextObjectProps = {
  content: string;
  link: string | null;
  annotations: Annotations;
  href: string | null;
};

function createTextObject(
  { content, link = null, annotations, href }: TextObjectProps,
): RichTextObjectText {
  return {
    type: "text",
    text: {
      content,
      link: link ? { url: link } : null,
    },
    annotations,
    plain_text: content,
    href,
  };
}

export { createTextObject };
