import AuthContextProvider from "./auth";
import MyTheme from "./theme";

interface Props {
  children: React.ReactNode;
}

const RootProvider = ({ children }: Props) => {
  return (
    <MyTheme>
      <AuthContextProvider>{children}</AuthContextProvider>
    </MyTheme>
  );
};

export default RootProvider;
