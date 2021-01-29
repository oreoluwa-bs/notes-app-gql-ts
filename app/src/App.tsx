import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DashboardPage, SignInPage, SignUpPage } from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";

import RootProvider from "./store/context";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <Box>
          <Switch>
            <Route exact path="/" component={() => <div>hi</div>} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />

            {/* <Route path="/app" component={DashboardPage} /> */}
            <ProtectedRoute path="/app" component={DashboardPage} />
          </Switch>
        </Box>
      </RootProvider>
    </BrowserRouter>
  );
};

export default App;
