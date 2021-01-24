import { gql } from "apollo-server";
import noteTypeDefs from "./note";
import userTypeDefs from "./user";

const typeDefs = gql`
  ${userTypeDefs}
  ${noteTypeDefs}

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
export default typeDefs;
