import { Box } from "@chakra-ui/react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
import { useEffect, useRef } from "react";
import { getBlockStyle, styleMap } from "./RichTextHelpers";
import RichTextMenuBar from "./RichTextMenuBar";

interface Props {
  editorState?: EditorState;
  setEditorState: (editorState: EditorState) => void;
  actions?: React.ReactNode[];
  onSave: () => void;
}

const RichTextEditor = ({
  editorState = EditorState.createEmpty(),
  setEditorState,
  actions = [],
  onSave,
}: Props) => {
  const EditorRef = useRef({}) as React.RefObject<Editor>;
  useEffect(() => {
    EditorRef?.current?.focus();
  });

  const handleOnChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (!newState) return "not-handled";

    handleOnChange(newState);
    return "handled";
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (e.key === "Tab") {
      const newEditorState = RichUtils.onTab(e as any, editorState, 4);
      if (newEditorState !== editorState) {
        handleOnChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e as any);
  };
  return (
    <Box minHeight="50vh">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="0.7rem"
        mb="2rem"
      >
        <RichTextMenuBar
          editorState={editorState}
          handleOnChange={handleOnChange}
        />
        <Box>{actions.map((item) => item)}</Box>
      </Box>
      <Editor
        ref={EditorRef}
        editorState={editorState}
        onChange={handleOnChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        customStyleMap={styleMap}
        blockStyleFn={getBlockStyle}
        spellCheck={true}
        onBlur={onSave}
      />
    </Box>
  );
};

export default RichTextEditor;
