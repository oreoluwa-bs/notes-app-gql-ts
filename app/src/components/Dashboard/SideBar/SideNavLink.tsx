import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { NavLink as RRNavLink } from "react-router-dom";

interface Props {}

const SideNavLink = (props: Props) => {
  return (
    <Link
      to="/app"
      as={RRNavLink}
      role="group"
      _hover={{ textDecoration: "none" }}
    >
      <Box
        borderRadius="lg"
        p="1rem"
        // borderBottomWidth="1px"
        // borderBottomColor="gray.200"
        color="gray.600"
        transition="all 0.4s"
        // _groupHover={{ bg: "primary.base", color: "white" }}
        // _groupActive={{ bg: "rgba(82, 173, 156, 0.3)", color: "primary.base" }}
        _groupHover={{ bg: "gray.200", color: "primary.base" }}
        _groupActive={{ bg: "gray.200", color: "primary.base" }}
      >
        <Heading fontSize="2xl">Hi</Heading>
        <Text noOfLines={1}>
          The quick brown fox jumps over the lazy dog is an English-language
          pangram—a sentence that contains all of the letters of the English
          alphabet. Owing to its existence, Chakra was created.
        </Text>
      </Box>
    </Link>
  );
};

export default SideNavLink;
