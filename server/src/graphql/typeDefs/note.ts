import { gql } from "apollo-server";

const noteTypeDefs = gql`
  input NoteCredentialsInput {
    "An title of the user"
    title: String

    "A content of the note"
    content: String
  }

  input FilterNoteOptionsInput {
    "The id of the note"
    id: ID

    "The slug of the note"
    slug: String
  }

  type Note {
    id: ID!
    title: String!
    slug: String!
    content: String
    author: User!
    createdAt: String
    deletedAt: String
  }

  type NoteDocumentPayload {
    status: String
    message: String
    doc: Note
  }

  extend type Query {
    notes(filter: FilterNoteOptionsInput, sort: String, limit: Int): [Note]
    getMyNotes(filter: FilterNoteOptionsInput, sort: String, limit: Int): [Note]
    note(filter: FilterNoteOptionsInput!): Note
  }

  extend type Mutation {
    createNote(noteData: NoteCredentialsInput!): NoteDocumentPayload!
    updateNote(id: ID!, noteData: NoteCredentialsInput!): NoteDocumentPayload!
    deleteNote(id: ID!): NoteDocumentPayload!
  }
`;

export default noteTypeDefs;
