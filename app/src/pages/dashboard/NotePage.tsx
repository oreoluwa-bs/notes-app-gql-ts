import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { EditorState } from "draft-js";
import { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { NoteContext, NoteContextType } from "../../store/context/note";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";

interface NotePageProps {
  noteslug?: string;
}

const GET_NOTE = gql`
  query GetNote($slug: String) {
    note(filter: { slug: $slug }) {
      id
      title
      slug
      content
    }
  }
`;

const NotePage = (props: RouteComponentProps<NotePageProps>) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { history, match } = props;
  const { handleUpdateNote, handleDeleteNote } = useContext(
    NoteContext
  ) as NoteContextType;
  const { loading, data, refetch } = useQuery(GET_NOTE, {
    variables: { slug: match.params?.noteslug },
  });

  const handleUpdate = async () => {
    const noteData = {};
    await handleUpdateNote({ noteID: data.note.id, noteData });
    await refetch();
  };

  const handleDelete = async () => {
    await handleDeleteNote(data.note.id);
    history.push("/app");
  };

  if (loading) return null;
  return (
    <Box minHeight="100vh" py="30px">
      {/* Text Editor */}
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
        actions={[
          <Menu key="more options">
            <Tooltip label="More Options">
              <MenuButton
                as={IconButton}
                aria-label="More"
                icon={<Icon as={FiMoreHorizontal} />}
              />
            </Tooltip>
            <MenuList>
              <MenuItem icon={<Icon as={HiTrash} />} onClick={handleDelete}>
                Delete Note
              </MenuItem>
              <MenuItem icon={<Icon as={HiTrash} />} onClick={handleUpdate}>
                Update Note
              </MenuItem>
              {/* <MenuItem command="⌘N">New Window</MenuItem>
              <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
              <MenuItem command="⌘O">Open File...</MenuItem> */}
            </MenuList>
          </Menu>,
        ]}
        onSave={() => {
          console.log("save note");
        }}
      />
    </Box>
  );
};

export default NotePage;
