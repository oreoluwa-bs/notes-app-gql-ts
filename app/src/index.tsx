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

const link = onError(({ graphQLErrors, networkError, response }) => {
  graphQLErrors && console.log("⚛️ [GraphQl Error]:", graphQLErrors);
  networkError && console.log("👮🏻‍♀️ [Network error]:", networkError);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([link, new HttpLink({ uri: "http://localhost:5000" })]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
