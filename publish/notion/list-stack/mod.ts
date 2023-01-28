import { MetaBlockTypeObject } from "../types/mod.ts";

type ListType = "bulleted" | "numbered";

const _stack: {
  type: ListType;
  items: MetaBlockTypeObject[];
}[] = [];

const listStack = {
  push: (listType: ListType) => {
    _stack.push({ type: listType, items: [] });
  },
  pushItem: (listItem: MetaBlockTypeObject) => {
    _stack.at(-1)?.items.push(listItem);
  },
  popItems: () => {
    return _stack.pop()?.items ?? [];
  },
  currentType: () => {
    return _stack.at(-1)?.type;
  },
  currentLevel: () => {
    return _stack.length;
  },
};

export { listStack };
