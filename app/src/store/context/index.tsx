import MyTheme from "./theme";

interface Props {
  children: JSX.Element;
}

const RootProvider = ({ children }: Props) => {
  return <MyTheme>{children}</MyTheme>;
};

export default RootProvider;
