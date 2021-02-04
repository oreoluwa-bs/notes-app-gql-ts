import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
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
  const { history, match } = props;
  const { handleUpdateNote, handleDeleteNote } = useContext(
    NoteContext
  ) as NoteContextType;
  const { loading, data, refetch } = useQuery(GET_NOTE, {
    variables: { slug: match.params?.noteslug },
  });

  const [noteData] = useState({ content: "Content" });

  const handleUpdate = async () => {
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
      <Button onClick={handleUpdate}>UpdateNote</Button>
      <Button onClick={handleDelete}>DeleteNote</Button>
    </Box>
  );
};

export default NotePage;
