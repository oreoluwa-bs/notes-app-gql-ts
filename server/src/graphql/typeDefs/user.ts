import { gql } from "apollo-server";

const userTypeDefs = gql`
  input AuthCredentialsInput {
    "An email address for the user"
    email: String!

    "A password for the user"
    password: String!
  }

  input FilterOptionsInput {
    "The id of the user"
    id: String

    "The email of the user"
    email: String
  }

  type User {
    id: ID!
    email: String!
    password: String
    createdAt: String
    deletedAt: String
  }

  type DocumentPayload {
    status: String
    doc: User
  }

  type AuthPayload {
    status: String!
    token: String
    message: String
    doc: User
  }

  extend type Query {
    users(filter: FilterOptionsInput, sort: String, limit: Int): [User]!
    user(filter: FilterOptionsInput!): DocumentPayload
  }

  extend type Mutation {
    signInUser(credentials: AuthCredentialsInput): AuthPayload!
    signUpUser(credentials: AuthCredentialsInput): AuthPayload!
  }
`;

// login(email: String! password: String!): User!

export default userTypeDefs;
