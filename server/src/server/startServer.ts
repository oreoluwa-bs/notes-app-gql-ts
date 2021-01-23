import { ApolloServer } from "apollo-server";

import accessEnv from "@root/helpers/accessEnv";
import typeDefs from "@root/graphql/typeDefs";
import resolvers from "@root/graphql/resolvers";

const PORT = accessEnv("PORT", 5000);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  context: ({ req, res }) => ({ req, res, payload: null }),
});

apolloServer.listen(PORT).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
