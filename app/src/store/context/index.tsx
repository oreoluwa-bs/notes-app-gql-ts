import AuthContextProvider from "./auth";
import NoteContextProvider from "./note";
import MyTheme from "./theme";

interface Props {
  children: React.ReactNode;
}

const RootProvider = ({ children }: Props) => {
  return (
    <MyTheme>
      <AuthContextProvider>
        <NoteContextProvider>{children}</NoteContextProvider>
      </AuthContextProvider>
    </MyTheme>
  );
};

export default RootProvider;
