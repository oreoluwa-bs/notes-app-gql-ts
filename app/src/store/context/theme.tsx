import { ChakraProvider, extendTheme } from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}

const myTheme = extendTheme({
  colors: {
    primary: {
      base: "#52AD9C",
      alt: "#6094B5",
    },
    secondary: "#8A4FFF",
  },
});

const MyTheme = ({ children }: Props) => {
  return <ChakraProvider theme={myTheme}>{children}</ChakraProvider>;
};

export default MyTheme;
