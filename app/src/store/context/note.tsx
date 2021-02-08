import { gql, Reference, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { createContext } from "react";
import { callToast } from "../../helpers/callToast";

interface INoteDataInput {
  title?: string;
  content?: string;
}

export type NoteContextType = {
  handleCreateNote: (noteData?: INoteDataInput) => Promise<any>;
  handleUpdateNote: ({
    noteID,
    noteData,
  }: {
    noteID: string;
    noteData: INoteDataInput;
  }) => Promise<void>;
  handleDeleteNote: (noteID: string) => Promise<void>;
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

const DELETE_NOTE = gql`
  mutation DeleteNote($noteID: ID!) {
    deleteNote(id: $noteID) {
      status
      message
      doc {
        id
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($noteID: ID!, $title: String, $content: String) {
    updateNote(id: $noteID, noteData: { title: $title, content: $content }) {
      status
      message
      doc {
        id
      }
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
  const [updateNote] = useMutation(UPDATE_NOTE, {
    update(cache, { data: { updateNote } }) {
      cache.modify({
        fields: {
          getMyNotes(existingNotes = [], { readField }) {
            const noteRef = existingNotes.find(
              (noteRef: Reference) =>
                updateNote.doc.id === readField("id", noteRef)
            );
            return new Set([noteRef, ...existingNotes]);
          },
        },
      });
    },
  });
  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      cache.modify({
        fields: {
          getMyNotes(existingNotes = [], { readField }) {
            return existingNotes.filter(
              (noteRef: Reference) =>
                deleteNote.doc.id !== readField("id", noteRef)
            );
          },
        },
      });
    },
  });

  const handleCreateNote = async (noteData: INoteDataInput = {}) => {
    try {
      const { data } = await createNote({ variables: noteData });
      return data.createNote;
    } catch (err) {
      callToast(noteToast, { status: "error", message: err.message });
    }
  };

  const handleUpdateNote = async ({
    noteID,
    noteData,
  }: {
    noteID: string;
    noteData: INoteDataInput;
  }) => {
    try {
      await updateNote({ variables: { noteID, ...noteData } });
    } catch (err) {
      callToast(noteToast, { status: "error", message: err.message });
    }
  };

  const handleDeleteNote = async (noteID: string) => {
    try {
      const { data } = await deleteNote({ variables: { noteID } });
      callToast(noteToast, {
        status: "info",
        message: data.deleteNote?.message,
      });
    } catch (err) {
      callToast(noteToast, { status: "error", message: err.message });
    }
  };

  return (
    <NoteContext.Provider
      value={{ handleCreateNote, handleUpdateNote, handleDeleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
