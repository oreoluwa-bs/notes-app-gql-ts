import {
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { NavLink as RRNavLink } from "react-router-dom";
import { transformContent } from "../../../helpers/note";

interface Props {
  path: string;
  slug?: string;
  title?: string;
  content?: string;
}

const SideNavLink = ({
  path = "/app",
  slug = "slug",
  title = "Title",
  content = "content",
}: Props) => {
  const { colors } = useTheme();

  const bg = useColorModeValue(colors.gray["200"], colors.teal["700"]);
  const textColor = useColorModeValue(colors.primary["base"], colors.white);

  const contentText = transformContent(content);

  return (
    <Link
      to={`${path}/note/${slug}`}
      as={RRNavLink}
      display="block"
      borderRadius="lg"
      transition="all 0.4s"
      _hover={{ textDecoration: "none", bg: bg, color: textColor }}
      _active={{ bg: bg, color: textColor }}
      _focus={{ boxShadow: "none" }}
      activeStyle={{
        background: bg,
        color: textColor,
      }}
    >
      <Box p="1rem">
        <Heading fontSize="2xl">{title}</Heading>
        <Text noOfLines={1}>{contentText}</Text>
      </Box>
    </Link>
    //   <Link
    //   to="/app/s"
    //   as={RRNavLink}
    //   // role="group"
    //   display="block"
    //   borderRadius="lg"
    //   transition="all 0.4s"
    //   _hover={{ textDecoration: "none", bg: "gray.200", color: "primary.base" }}
    //   _focus={{ boxShadow: "none" }}
    //   _active={{ bg: "gray.200", color: "primary.base" }}
    //   style={{
    //     transition: "all 0.4s",
    //   }}
    //   activeStyle={{
    //     transition: "all 0.4s",
    //     background: colors.gray["200"],
    //     color: colors.primary["base"],
    //   }}
    // >
    //   <Box
    //     // borderRadius="lg"
    //     p="1rem"
    //     // borderBottomWidth="1px"
    //     // borderBottomColor="gray.200"
    //     // color="gray.600"
    //     // transition="all 0.4s"
    //     // _groupHover={{ bg: "primary.base", color: "white" }}
    //     // _groupActive={{ bg: "rgba(82, 173, 156, 0.3)", color: "primary.base" }}
    //     // _groupHover={{ bg: "gray.200", color: "primary.base" }}
    //     // _groupActive={{ bg: "gray.200", color: "primary.base" }}
    //   >
    //     <Heading fontSize="2xl">Hi</Heading>
    //     <Text noOfLines={1}>
    //       The quick brown fox jumps over the lazy dog is an English-language
    //       pangram—a sentence that contains all of the letters of the English
    //       alphabet. Owing to its existence, Chakra was created.
    //     </Text>
    //   </Box>
    // </Link>
  );
};

export default SideNavLink;
