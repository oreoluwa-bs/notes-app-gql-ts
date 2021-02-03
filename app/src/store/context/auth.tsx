import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { createContext } from "react";
import { callToast } from "../../helpers/callToast";
import { setAccessToken, getAccessToken } from "../global/accessToken";

export type AuthContextType = {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

  handleRefreshMyToken: () => Promise<void>;

  handleSignOutUser: () => Promise<void>;

  handleSignIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;

  handleSignUp: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
};
export const AuthContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      status
      message
      accessToken
    }
  }
`;

const SIGN_UP = gql`
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

const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const authToast = useToast();
  const [signInUser] = useMutation(SIGN_IN);
  const [signUpUser] = useMutation(SIGN_UP);
  const [refreshMyToken] = useMutation(REFRESH_MY_TOKEN);
  const [signOutUser, { client }] = useMutation(SIGN_OUT_USER);

  const handleSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await signInUser({ variables: credentials });
      setAccessToken(data.signInUser["accessToken"]);
    } catch (err) {
      callToast(authToast, { message: err.message, status: "error" });
    }
  };

  const handleSignUp = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await signUpUser({ variables: credentials });
      setAccessToken(data.signUpUser["accessToken"]);
    } catch (err) {
      callToast(authToast, { message: err.message, status: "error" });
    }
  };

  const handleSignOutUser = async () => {
    try {
      await signOutUser();
      setAccessToken("");
      await client.resetStore();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefreshMyToken = async () => {
    try {
      const { data } = await refreshMyToken();
      setAccessToken(data.refreshMyToken["accessToken"]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        getAccessToken,
        setAccessToken,
        handleRefreshMyToken,
        handleSignOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
