import { ContentBlock } from "draft-js";

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 6,
  },
};

export function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "header-one":
      return "RichEditor-heading RichEditor-h1";
    case "header-two":
      return "RichEditor-heading RichEditor-h2";
    case "header-three":
      return "RichEditor-heading RichEditor-h3";
    case "ordered-list-item":
      return "RichEditor-ol";
    case "unordered-list-item":
      return "RichEditor-ul";
    default:
      return "";
  }
}
