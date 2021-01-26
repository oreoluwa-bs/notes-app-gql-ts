import { Box, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RRLink } from "react-router-dom";

import { NotesLogo } from "../icons";

interface Props {
  iconColor?: string;
}

const Navbar = ({ iconColor = "white" }: Props) => {
  return (
    <Box as="header" position="relative">
      <Box
        position="absolute"
        height="60px"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="3rem"
      >
        <Link as={RRLink} to="/">
          <NotesLogo fontSize="50px" color={iconColor} />
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
