import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";

export const transformEditorState = (content: ContentState) => {
  return JSON.stringify(convertToRaw(content));
};

export const transformNoteTitle = (content: ContentState) => {
  const title =
    content
      .getBlocksAsArray()
      .find((block) => block.getText().trim().length > 0)
      ?.getText() || "Untitled Note";
  return title;
};

export const transformContent = (content: string) => {
  const curr = convertFromRaw(JSON.parse(content));
  const title = transformNoteTitle(curr);
  const contentText = curr
    .getPlainText(" ")
    .trim()
    .split(title)
    .join("")
    .trim();
  return contentText.trim();
};

export const transformNoteData = (editorState: EditorState) => {
  const currentContent = editorState.getCurrentContent();

  return {
    title: transformNoteTitle(currentContent),
    content: transformEditorState(currentContent),
  };
};
