import { Box } from "@chakra-ui/react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
import { useRef, useState } from "react";
import RichTextMenuBar from "./RichTextMenuBar";

interface Props {
  actions?: React.ReactNode[];
}

const RichTextEditor = ({ actions = [] }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const EditorRef = useRef({}) as React.RefObject<Editor>;

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
        console.log("hi");
        handleOnChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e as any);
  };

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block: any) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  }

  return (
    <Box minHeight="50vh">
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        // customStyleMap={styleMap}
        // blockStyleFn={getBlockStyle}
        spellCheck={true}
      />
    </Box>
  );
};

export default RichTextEditor;
