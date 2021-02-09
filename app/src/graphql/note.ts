import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
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

export const DELETE_NOTE = gql`
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

export const UPDATE_NOTE = gql`
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
