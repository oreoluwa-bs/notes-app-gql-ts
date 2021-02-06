import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { EditorState } from "draft-js";
import { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { NoteContext, NoteContextType } from "../../store/context/note";

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
          <Button key="up" onClick={handleUpdate}>
            UpdateNote
          </Button>,
          <Button key="del-btn" onClick={handleDelete}>
            DeleteNote
          </Button>,
        ]}
        onSave={() => {
          console.log("save note");
        }}
      />
    </Box>
  );
};

export default NotePage;
