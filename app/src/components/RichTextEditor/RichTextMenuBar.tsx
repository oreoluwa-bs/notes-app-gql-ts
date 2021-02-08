import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Stack,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import { EditorState, RichUtils } from "draft-js";
import React from "react";
import {
  BsCode,
  BsListUl,
  BsListOl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
} from "react-icons/bs";
import { IoIosQuote } from "react-icons/io";

interface Props {
  editorState: EditorState;
  handleOnChange: (e: EditorState) => void;
}

const BLOCK_TYPES = [
  { name: "Header One", label: "H1", style: "header-one" },
  { name: "Header Two", label: "H2", style: "header-two" },
  { name: "Header Three", label: "H3", style: "header-three" },
  {
    name: "Blockquote",
    label: "Blockquote",
    style: "blockquote",
    icon: IoIosQuote,
  },
  {
    name: "Bullet List",
    label: "UL",
    style: "unordered-list-item",
    icon: BsListUl,
  },
  {
    name: "Numbered List",
    label: "OL",
    style: "ordered-list-item",
    icon: BsListOl,
  },
  //   { label: "Code Block", style: "code-block" },
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: BsTypeBold },
  { label: "Italic", style: "ITALIC", icon: BsTypeItalic },
  { label: "Underline", style: "UNDERLINE", icon: BsTypeUnderline },
  { label: "Monospace", style: "CODE", icon: BsCode },
];

const RichTextMenuBar = (props: Props) => {
  const { editorState, handleOnChange } = props;
  const toggleBlockType = (blockType: string) => {
    handleOnChange(RichUtils.toggleBlockType(editorState, blockType));
  };
  const toggleInlineStyle = (inlineStyle: string) => {
    handleOnChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <Box>
      <Stack
        direction={{ base: "column", sm: "row" }}
        divider={<StackDivider />}
        // spacing="0.4rem"
      >
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      </Stack>
    </Box>
  );
};

export default RichTextMenuBar;

const BlockStyleControls = (props: {
  editorState: EditorState;
  onToggle: (style: string) => void;
}) => {
  const { editorState, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ButtonGroup spacing="0.4rem">
      {BLOCK_TYPES.map((type) => (
        <Tooltip
          key={type.label}
          label={type.name}
          aria-label={`${type.name}-tooltip`}
          bg="secondary"
          color="white"
        >
          {type.icon ? (
            <IconButton
              onClick={() => onToggle(type.style)}
              isActive={type.style === blockType}
              _active={{ backgroundColor: "primary.base" }}
              aria-label={`${type.label}-button`}
              icon={<Icon as={type.icon} />}
            />
          ) : (
            <Button
              onClick={() => onToggle(type.style)}
              isActive={type.style === blockType}
              _active={{ backgroundColor: "primary.base" }}
            >
              {type.label}
            </Button>
          )}
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};

const InlineStyleControls = (props: {
  editorState: EditorState;
  onToggle: (style: string) => void;
}) => {
  const { onToggle } = props;
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <ButtonGroup spacing="0.4rem">
      {INLINE_STYLES.map((type) => (
        <Tooltip
          key={type.label}
          label={type.label}
          aria-label={`${type.label}-tooltip`}
          bg="secondary"
          color="white"
        >
          {type.icon ? (
            <IconButton
              key={type.label}
              onClick={() => onToggle(type.style)}
              isActive={currentStyle.has(type.style)}
              _active={{ backgroundColor: "primary.base" }}
              aria-label={`${type.label}-button`}
              icon={<Icon as={type.icon} />}
            />
          ) : (
            <Button
              key={type.label}
              onClick={() => onToggle(type.style)}
              isActive={currentStyle.has(type.style)}
              _active={{ backgroundColor: "primary.base" }}
            >
              {type.label}
            </Button>
          )}
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};
