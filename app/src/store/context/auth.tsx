import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { createContext } from "react";
import {
  REFRESH_MY_TOKEN,
  SIGN_IN,
  SIGN_OUT_USER,
  SIGN_UP,
} from "../../graphql/user";
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
