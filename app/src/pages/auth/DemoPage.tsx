import { Center, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../store/context/auth";

interface Props {}

const DemoPage = (props: RouteComponentProps<Props>) => {
  const { history } = props;
  const { handleSignIn } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    (async () => {
      await handleSignIn({ email: "test1@test.com", password: "password" });
      history.push("/app");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default DemoPage;
