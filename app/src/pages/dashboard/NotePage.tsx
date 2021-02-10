import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { convertFromRaw, EditorState } from "draft-js";
import { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { NoteContext, NoteContextType } from "../../store/context/note";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiDocumentDownload, HiTrash } from "react-icons/hi";
import { transformNoteData } from "../../helpers/note";
import TextToSpeech from "../../components/TextToSpeech";

interface NotePageProps {
  noteslug?: string;
  isSideNavOpen?: boolean;
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

const NotePage = ({ isSideNavOpen }: NotePageProps) => {
  // const { history, match } = props;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const history = useHistory();
  const match = useRouteMatch() as any;

  const { handleUpdateNote, handleDeleteNote } = useContext(
    NoteContext
  ) as NoteContextType;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { loading, data, refetch } = useQuery(GET_NOTE, {
    variables: { slug: match.params?.noteslug },
  });

  const handleUpdate = async () => {
    const noteData = transformNoteData(editorState);
    await handleUpdateNote({ noteID: data.note.id, noteData });
    await refetch();
  };

  const handleDelete = async () => {
    await handleDeleteNote(data.note.id);
    history.push("/app");
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setIsSpeaking(false);
      if (data?.note?.content) {
        const rawContent = convertFromRaw(JSON.parse(data.note.content));
        setEditorState(EditorState.createWithContent(rawContent));
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
    return () => {
      mounted = false;
    };
  }, [data?.note]);

  if (loading)
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  return (
    <Box minHeight="100vh" pb="30px" width="100%">
      {/* Text Editor */}
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
        isSideNavOpen={isSideNavOpen}
        actions={[
          isSpeaking ? (
            <Box key="speak" display="inline-block">
              <TextToSpeech
                handleOnFinishSpeaking={() => setIsSpeaking(false)}
                utterText={editorState.getCurrentContent().getPlainText()}
              />
            </Box>
          ) : undefined,
          <Box key="more options" display="inline-block">
            <Menu key="more options">
              <Tooltip label="More Options">
                <MenuButton
                  as={IconButton}
                  aria-label="More"
                  icon={<Icon as={FiMoreHorizontal} />}
                />
              </Tooltip>
              <MenuList>
                <MenuItem
                  icon={<Icon as={HiDocumentDownload} />}
                  onClick={() => {
                    const element = document.createElement("a");

                    const dataa = editorState
                      .getCurrentContent()
                      .getPlainText("")
                      .split(" ")
                      .join(" ");

                    const file = new Blob([dataa], {
                      type: "text/plain",
                    });

                    element.href = URL.createObjectURL(file);
                    element.download = data.note.title;
                    document.body.appendChild(element);
                    element.click();
                    console.log(dataa);
                  }}
                >
                  Download Note as txt
                </MenuItem>
                <MenuItem
                  icon={<Icon as={HiTrash} />}
                  onClick={() => {
                    if ("speechSynthesis" in window) {
                      setIsSpeaking(true);
                    } else {
                      alert(
                        "Sorry, your browser doesn't support this feature!"
                      );
                    }
                  }}
                >
                  Read Note Aloud
                </MenuItem>
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
            </Menu>
          </Box>,
        ]}
        onSave={() => {
          console.log("save note");
        }}
      />
    </Box>
  );
};

export default NotePage;
