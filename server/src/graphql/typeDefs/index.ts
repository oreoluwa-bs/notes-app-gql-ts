import { gql } from "apollo-server";
import userTypeDefs from "./user";

const typeDefs = gql`
  ${userTypeDefs}

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
export default typeDefs;
