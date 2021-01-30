import { Box, Center, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { DashboardPage, SignInPage, SignUpPage } from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthContext, AuthContextType } from "./store/context/auth";

interface Props {}

const Routes = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleRefreshMyToken } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await handleRefreshMyToken();
      setIsLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Center height="100vh" colorScheme="blackAlpha">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <Box>
      <Switch>
        <Route exact path="/" component={() => <div>hi</div>} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />

        {/* <Route path="/app" component={DashboardPage} /> */}
        <ProtectedRoute path="/app" component={DashboardPage} />
      </Switch>
    </Box>
  );
};

export default Routes;
