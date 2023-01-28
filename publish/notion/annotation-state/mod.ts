import { Annotations } from "../types/mod.ts";

const _state: Annotations = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: "default",
};

const annotationState = {
  bold: function () {
    _state.bold = true;
  },
  unBold: function () {
    _state.bold = false;
  },
  strikethrough: function () {
    _state.strikethrough = true;
  },
  unStrikethrough: function () {
    _state.strikethrough = false;
  },
  get: function () {
    return { ..._state };
  },
};

export { annotationState };
