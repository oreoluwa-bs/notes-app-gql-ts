import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
import { useEffect, useRef } from "react";
import { getBlockStyle, styleMap } from "./RichTextHelpers";
import RichTextMenuBar from "./RichTextMenuBar";

interface Props {
  editorState?: EditorState;
  setEditorState: (editorState: EditorState) => void;
  actions?: React.ReactNode[];
  onSave: () => void;
  isSideNavOpen?: boolean;
}

const RichTextEditor = ({
  editorState = EditorState.createEmpty(),
  setEditorState,
  actions = [],
  onSave,
  isSideNavOpen = true,
}: Props) => {
  const EditorRef = useRef({}) as React.RefObject<Editor>;
  useEffect(() => {
    EditorRef?.current?.focus();
  }, []);

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

  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box minHeight="80vh">
      <Box
        bg={bg}
        p="30px"
        position="fixed"
        width={{
          base: "100%",
          lg: isSideNavOpen ? "calc(100% - 10px)" : "calc(100% - 260px)",
        }}
        transition="width 0.55s"
        zIndex={1}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ base: "start", sm: "center" }}
        >
          <RichTextMenuBar
            editorState={editorState}
            handleOnChange={handleOnChange}
          />
          <Stack
            direction={{ base: "column-reverse", sm: "row" }}
            spacing={{ base: "1rem", sm: "0.5rem" }}
          >
            {actions.map((item) => item)}
          </Stack>
        </Box>
      </Box>
      <Box pt={{ base: "40", sm: "28" }} px="35px">
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
    </Box>
  );
};

export default RichTextEditor;
