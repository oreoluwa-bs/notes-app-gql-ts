import { gql, useMutation } from "@apollo/client";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { createContext, useState } from "react";

export type AuthContextType = {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;

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
      doc {
        id
        email
      }
    }
  }
`;

const SIGN_UP = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      status
      message
      accessToken
      doc {
        id
        email
      }
    }
  }
`;

const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [auth, setAuth] = useState<string | null>(null);
  const authToast = useToast();
  const [signInUser] = useMutation(SIGN_IN);
  const [signUpUser] = useMutation(SIGN_UP);

  const getAccessToken = () => auth;
  const setAccessToken = (token: string) => setAuth(token);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
