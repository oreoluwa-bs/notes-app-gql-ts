import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import RootProvider from "./store/context";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <Routes />
      </RootProvider>
    </BrowserRouter>
  );
};

export default App;
