import { ApolloServer } from "apollo-server";

import accessEnv from "@root/helpers/accessEnv";
import typeDefs from "@root/graphql/typeDefs";
import resolvers from "@root/graphql/resolvers";
import { getToken } from "@root/helpers/authHelpers";

const PORT = accessEnv("PORT", 5000);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  context: ({ req, res }) => ({
    token: getToken(req.headers.authorization),
  }),
});

apolloServer.listen(PORT).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
