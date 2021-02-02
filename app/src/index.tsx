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
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "./store/global/accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const apolloURI =
  process.env.REACT_APP_APOLLO_SERVER_URI ?? "http://localhost:5000";

const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) return true;

    try {
      const { exp }: { exp: number } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  },
  fetchAccessToken: async () => {
    const resp = await fetch(apolloURI, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getAccessToken()}` || "",
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query: `mutation RefreshMyToken {
        refreshMyToken {
          status
          message
          accessToken
        }
      }`,
      }),
    });
    return resp.json();
  },
  handleResponse: (operation, accessTokenField) => (response: any) => {
    return response.data.refreshMyToken;
  },
  handleFetch: (accessToken: string) => {
    setAccessToken(accessToken);
  },
  handleError: (err: Error) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const errLink = onError(({ graphQLErrors, networkError, response }) => {
  graphQLErrors && console.log("⚛️ [GraphQl Error]:", graphQLErrors);
  networkError && console.log("👮🏻‍♀️ [Network error]:", networkError);
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  if (!token) return headers;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  name: "react-web-client",
  link: ApolloLink.from([
    refreshLink,
    errLink,
    authLink.concat(
      new HttpLink({
        uri: apolloURI,
        credentials: "include",
      })
    ),
  ]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
