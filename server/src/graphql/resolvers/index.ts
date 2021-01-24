import Note from "./Note";
import * as Query from "@root/graphql/resolvers/Query";
import * as Mutation from "@root/graphql/resolvers/Mutation";

const resolvers = {
  Note,
  Query,
  Mutation,
};

export default resolvers;
