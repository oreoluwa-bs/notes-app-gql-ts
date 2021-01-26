import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignInPage } from "./pages";

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
            <Route path="/signup" component={SignInPage} />

            <Route path="/app" component={SignInPage} />
          </Switch>
        </Box>
      </RootProvider>
    </BrowserRouter>
  );
};

export default App;
