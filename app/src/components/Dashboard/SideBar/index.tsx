import { gql, useQuery } from "@apollo/client";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Skeleton,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiMenu, HiSearch, HiX } from "react-icons/hi";
import { Link as RRLink, useRouteMatch } from "react-router-dom";
import { NotesLogo } from "../../icons";
import SideNavLink from "./SideNavLink";

interface SideNavProps {
  isMobile: boolean;
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const GET_MY_NOTES = gql`
  query GetMyNotes {
    getMyNotes {
      id
      title
      slug
      content
    }
  }
`;

const SideBar = ({ isOpen, onOpen, onClose, isMobile }: SideNavProps) => {
  const [searchValue, setSearchValue] = useState<undefined | string>(undefined);
  const { loading, data: myNotes } = useQuery(GET_MY_NOTES);

  const handleOnChangeSearchValue = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(evt.target.value);
  };

  const currentMatch = useRouteMatch();

  const bg = useColorModeValue("gray.100", "gray.700");
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const focusBG = useColorModeValue("white", "transparent");

  return (
    <Box>
      <Box
        bg={bg}
        height="100vh"
        w="260px"
        py="0.5rem"
        position={{ base: "absolute", lg: "fixed" }}
        transition="all 0.5s"
        transform={!isOpen ? "translateX(0)" : "translateX(-250px)"}
        display="flex"
        flexDirection="column"
        zIndex={1}
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
        {/* Toggle sidebar */}

        <Box position="absolute" right={"-20px"} top={"40px"}>
          <IconButton
            onClick={isOpen ? onClose : onOpen}
            aria-label="toggle Menu bar"
            icon={<HiMenu />}
            bg={buttonBg}
          />
        </Box>
        {/* Search */}
        <Box p="1rem">
          <FormControl id="email">
            <VisuallyHidden>
              <FormLabel>Search</FormLabel>
            </VisuallyHidden>

            <InputGroup>
              {!searchValue && (
                <InputLeftElement>
                  <Icon aria-label="cancel search" as={HiSearch} />
                </InputLeftElement>
              )}
              <Input
                type="text"
                name="search"
                placeholder="Search Note"
                _focus={{ bg: focusBG }}
                value={searchValue}
                onChange={handleOnChangeSearchValue}
              />
              {searchValue && (
                <InputRightElement>
                  <IconButton
                    size="sm"
                    aria-label="cancel search"
                    icon={<Icon as={HiX} />}
                    onClick={() => setSearchValue("")}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
        </Box>

        {/* lINKS */}
        <Skeleton isLoaded={!loading}>
          <Box p="1rem">
            {myNotes?.getMyNotes?.map(({ slug, ...note }: { slug: string }) => (
              <SideNavLink
                key={`note-${slug}`}
                path={currentMatch.path}
                slug={slug}
                {...note}
              />
            ))}
          </Box>
        </Skeleton>
      </Box>
      {!isOpen && isMobile && (
        <Box
          position="absolute"
          width="100%"
          height="100vh"
          right={"0px"}
          top={"0px"}
          // bg="orange.100"
          bg="transparent"
          onClick={onOpen}
          z={1}
        />
      )}
    </Box>
  );
};

export default SideBar;
