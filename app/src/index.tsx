import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { accesToken } from "./store/context/auth";

const link = onError(({ graphQLErrors, networkError, response }) => {
  graphQLErrors && console.log("⚛️ [GraphQl Error]:", graphQLErrors);
  networkError && console.log("👮🏻‍♀️ [Network error]:", networkError);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    link,
    new HttpLink({
      uri: process.env.REACT_APP_APOLLO_SERVER_URI,
      credentials: "include",
    }),
  ]),
  credentials: "include",
  headers: {
    authorization: `Bearer ${accesToken}` || "",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
