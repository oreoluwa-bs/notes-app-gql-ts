import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { NotesLogo } from "../../components/icons";

interface Props {}

const DashboardPage = (props: Props) => {
  const {
    isOpen: isSideNavOpen,
    onOpen: onOpenSideNav,
    onClose: onCloseSideNav,
  } = useDisclosure();
  return (
    <Box display="flex">
      <Box
        bg="gray.100"
        height="100vh"
        w="260px"
        py="0.5rem"
        position="fixed"
        transition="all 0.5s"
        transform={!isSideNavOpen ? "translateX(0)" : "translateX(-250px)"}
        display="flex"
        flexDirection="column"
      >
        {/* Util */}
        <Box>
          <NotesLogo color="primary.base" fontSize="50px" />
        </Box>
        <Box
          position="absolute"
          right={"-20px"}
          // top={"20px"}
        >
          <IconButton
            onClick={isSideNavOpen ? onCloseSideNav : onOpenSideNav}
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
        <Box py="1rem">
          <Box bg="primary.base" p="1rem" color="white">
            <Heading fontSize="2xl">Hi</Heading>
            <Text noOfLines={1}>
              The quick brown fox jumps over the lazy dog is an English-language
              pangram—a sentence that contains all of the letters of the English
              alphabet. Owing to its existence, Chakra was created.
            </Text>
          </Box>

          <Box
            bg="transparent"
            p="1rem"
            color="gray.600"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
          >
            <Heading fontSize="2xl">Hi</Heading>
            <Text noOfLines={1}>
              The quick brown fox jumps over the lazy dog is an English-language
              pangram—a sentence that contains all of the letters of the English
              alphabet. Owing to its existence, Chakra was created.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
