import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignInPage } from "./pages";

import RootProvider from "./store/context";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <Switch>
          <Route path="/app" component={SignInPage} />
          hi
          <Route exact path="/" component={() => <div>hi</div>} />
          <Route path="/signin" component={SignInPage} />
        </Switch>
      </RootProvider>
    </BrowserRouter>
  );
};

export default App;
