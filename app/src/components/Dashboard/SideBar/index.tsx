import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  VisuallyHidden,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { Link as RRLink, useRouteMatch } from "react-router-dom";
import { NotesLogo } from "../../icons";
import SideNavLink from "./SideNavLink";

interface SideNavProps {
  isOpen: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SideBar = ({ isOpen, onOpen, onClose }: SideNavProps) => {
  const currentMatch = useRouteMatch();
  return (
    <Box
      bg="gray.100"
      height="100vh"
      w="260px"
      py="0.5rem"
      position="fixed"
      transition="all 0.5s"
      transform={!isOpen ? "translateX(0)" : "translateX(-250px)"}
      display="flex"
      flexDirection="column"
    >
      {/* Util */}
      <Box>
        <Link
          as={RRLink}
          to="/app"
          display="inline-block"
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <NotesLogo color="primary.base" fontSize="50px" />
        </Link>
      </Box>
      <Box position="absolute" right={"-20px"} top={"40px"}>
        <IconButton
          onClick={isOpen ? onClose : onOpen}
          aria-label="toggle Menu bar"
          icon={<HiMenu />}
        />
      </Box>
      {/* Search */}
      <Box p="1rem">
        <FormControl id="email">
          <VisuallyHidden>
            <FormLabel>Search</FormLabel>
          </VisuallyHidden>
          <Input type="text" name="search" placeholder="Search Note" />
        </FormControl>
      </Box>

      {/* lINKS */}
      <Box p="1rem">
        {[1, 2].map((data, index) => (
          <SideNavLink key={index} path={currentMatch.path} {...data} />
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;
