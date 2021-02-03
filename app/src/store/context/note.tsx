import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { createContext } from "react";
import { callToast } from "../../helpers/callToast";

interface INoteDataInput {
  title?: string;
  content?: string;
}

export type NoteContextType = {
  handleCreateNote: (noteData?: INoteDataInput) => Promise<void>;
  handleUpdateNote: (noteData: INoteDataInput) => Promise<void>;
};

export const NoteContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $content: String) {
    createNote(noteData: { title: $title, content: $content }) {
      status
      message
      doc {
        id
        slug
        title
        content
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($title: String!, $content: String) {
    updateNote(noteData: { title: $title, content: $content }) {
      status
      message
    }
  }
`;

const NoteContextProvider: React.FC<Props> = ({ children }: Props) => {
  const noteToast = useToast();
  const [createNote] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      // Updates cache of existing notes
      cache.modify({
        fields: {
          // Name of cache field
          getMyNotes(existingNotes = []) {
            const newNoteRef = cache.writeFragment({
              data: createNote.doc,
              fragment: gql`
                fragment NewNote on Note {
                  id
                  slug
                  title
                  content
                }
              `,
            });
            return [newNoteRef, ...existingNotes];
          },
        },
      });
    },
  });
  const [updateNote] = useMutation(UPDATE_NOTE);

  const handleCreateNote = async (noteData: INoteDataInput = {}) => {
    try {
      await createNote({ variables: noteData });
    } catch (err) {
      callToast(noteToast, { status: "error", message: err.message });
    }
  };

  const handleUpdateNote = async (noteData: INoteDataInput) => {
    try {
      await updateNote({ variables: noteData });
    } catch (err) {
      callToast(noteToast, { status: "error", message: err.message });
    }
  };

  return (
    <NoteContext.Provider value={{ handleCreateNote, handleUpdateNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
