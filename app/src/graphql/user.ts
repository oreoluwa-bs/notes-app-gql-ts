import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      status
      message
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUpUser(credentials: { email: $email, password: $password }) {
      status
      message
      accessToken
    }
  }
`;

export const REFRESH_MY_TOKEN = gql`
  mutation RefreshMyToken {
    refreshMyToken {
      status
      message
      accessToken
    }
  }
`;

export const SIGN_OUT_USER = gql`
  mutation SignOutUser {
    signOutUser
  }
`;
