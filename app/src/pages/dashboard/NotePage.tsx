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
                    const utterText = editorState
                      .getCurrentContent()
                      .getPlainText("");

                    const synth = window.speechSynthesis;
                    // Speech Synthesis supported 🎉
                    const voices = synth.getVoices();

                    const msg = new SpeechSynthesisUtterance();
                    msg.text = utterText;

                    msg.voice = voices[4];
                    msg.volume = 1;
                    msg.rate = 0.8;

                    synth.speak(msg);
                  } else {
                    alert("Sorry, your browser doesn't support this feature!");
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

// interface IProps {
//   key?: string;
//   utterText: string;
// }

// const SpeechComp = (props: IProps) => {
//   // const [synth, setSynth] = useState<SpeechSynthesis>();
//   const { utterText } = props;

//   useEffect(() => {
//     const voices = synth.getVoices();

//     const msg = new SpeechSynthesisUtterance();
//     msg.text = utterText;

//     msg.voice = voices[4];
//     msg.volume = 1;
//     msg.rate = 0.8;

//     synth.speak(msg);
//     // msg.onstart = (ev: SpeechSynthesisEvent) => {
//     //   setSyncState(true);
//     // };
//     // msg.onend = (ev: SpeechSynthesisEvent) => {};
//   }, [synth, utterText]);
//   return <Box display="inline-block">speak</Box>;
// };

// export default SpeechComp;
