import { gql, useMutation } from "@apollo/client";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { createContext } from "react";

export type AuthContextType = {
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
  const authToast = useToast();
  const [signInUser] = useMutation(SIGN_IN);
  const [signUpUser] = useMutation(SIGN_UP);

  const handleSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await signInUser({ variables: credentials });
      console.log(data);
    } catch (err) {
      callToast({ message: err.message, status: "error" });
    }
  };

  const handleSignUp = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await signUpUser({ variables: credentials });
      console.log(data);
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
    const toastConfig: UseToastOptions = {
      position: "top",
      duration: 9000,
      isClosable: true,
    };
    authToast({
      title: message,
      status,
      ...toastConfig,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
