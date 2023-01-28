import { RichTextObject } from "../types/mod.ts";

const _stack: {
  richTextObjects: RichTextObject[];
}[] = [{ richTextObjects: [] }];

const richTextStack = {
  pushLevel: () => {
    _stack.push({ richTextObjects: [] });
  },
  push: (richTextObject: RichTextObject) => {
    _stack.at(-1)?.richTextObjects.push(richTextObject);
  },
  popLevel: () => {
    _stack.pop();
  },
  popAll: function () {
    const current = _stack.pop();
    this.pushLevel();
    return current?.richTextObjects ?? [];
  },
  appendSoftBreak: () => {
    const richTextObject = _stack.at(-1)?.richTextObjects.at(-1);
    if (!richTextObject || richTextObject.type !== "text") {
      return;
    }
    richTextObject.plain_text += "\n";
    richTextObject.text.content += "\n";
  },
};

export { richTextStack };
