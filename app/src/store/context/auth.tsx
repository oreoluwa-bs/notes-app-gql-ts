import { gql, useMutation } from "@apollo/client";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { createContext } from "react";
import { setAccessToken, getAccessToken } from "../global/accessToken";

export type AuthContextType = {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

  handleRefreshMyToken: () => Promise<void>;

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

const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  // const [auth, setAuth] = useState<string | null>(null);
  const authToast = useToast();
  const [signInUser] = useMutation(SIGN_IN);
  const [signUpUser] = useMutation(SIGN_UP);
  const [refreshMyToken] = useMutation(REFRESH_MY_TOKEN);

  const handleSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await signInUser({ variables: credentials });
      setAccessToken(data.signInUser["accessToken"]);
    } catch (err) {
      callToast({ message: err.message, status: "error" });
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
      callToast({ message: err.message, status: "error" });
    }
  };

  const handleRefreshMyToken = async () => {
    try {
      const { data } = await refreshMyToken();
      setAccessToken(data.refreshMyToken["accessToken"]);
    } catch (err) {
      console.log(err);
      // callToast({ message: err.message, status: "error" });
    }
  };

  const callToast = ({
    status,
    message,
  }: {
    status: UseToastOptions["status"];
    message: string;
  }) => {
    authToast({
      status,
      title: message,
      position: "top",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        getAccessToken,
        setAccessToken,
        handleRefreshMyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
