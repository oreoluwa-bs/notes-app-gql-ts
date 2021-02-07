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
  const title = content.getFirstBlock().getText();
  return title;
};

export const transformContent = (content: string) => {
  const curr = convertFromRaw(JSON.parse(content));
  const firstBlockText = curr.getFirstBlock().getText();
  const contentText = curr.getPlainText(" ").split(firstBlockText).join("");
  return contentText.trim();
};

export const transformNoteData = (editorState: EditorState) => {
  const currentContent = editorState.getCurrentContent();

  return {
    title: transformNoteTitle(currentContent),
    content: transformEditorState(currentContent),
  };
};
