import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
export default typeDefs;
