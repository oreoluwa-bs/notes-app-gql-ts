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
  useControllableState,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiMenu, HiSearch, HiX } from "react-icons/hi";
import { Link as RRLink, useRouteMatch } from "react-router-dom";
import { NotesLogo } from "../../icons";
import SideNavLink from "./SideNavLink";
import SideNavUserActions from "./SideNavUserActions";

interface SideNavProps {
  isMobile: boolean;
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const GET_MY_NOTES = gql`
  query GetMyNotes {
    getMyNotes(sort: "-createdAt") {
      id
      title
      slug
      content
    }
  }
`;

const SideBar = ({ isOpen, onOpen, onClose, isMobile }: SideNavProps) => {
  const [myNotes, setMyNotes] = useState({ getMyNotes: [] });
  const [searchValue, setSearchValue] = useControllableState<string>({
    defaultValue: "",
  });
  const { loading, data } = useQuery(GET_MY_NOTES);

  const handleOnChangeSearchValue = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(evt.target.value);
    if (evt.target.value) {
      const newNotes = myNotes.getMyNotes.filter(
        ({ content = "" }: { content: string | null }) => {
          if (!content) {
            return false;
          }
          return content.toLowerCase().includes(evt.target.value.toLowerCase());
        }
      );
      setMyNotes({ getMyNotes: newNotes });
    } else {
      setMyNotes(data);
    }
  };

  useEffect(() => {
    setMyNotes(data);
  }, [data]);

  const currentMatch = useRouteMatch();
  const { colors } = useTheme();
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
            onClick={isMobile ? onOpen : () => {}}
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
                    onClick={() => {
                      setSearchValue("");
                      setMyNotes(data);
                    }}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
        </Box>

        <Box
          py="1rem"
          flex="1"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.primary["base"],
              borderRadius: "20px",
            },
          }}
        >
          {/* lINKS */}
          <Skeleton isLoaded={!loading}>
            <Box px="1rem">
              {myNotes?.getMyNotes?.map(
                ({ slug, ...note }: { slug: string }) => (
                  <SideNavLink
                    key={`note-${slug}`}
                    path={currentMatch.path}
                    slug={slug}
                    onClick={isMobile ? onOpen : undefined}
                    {...note}
                  />
                )
              )}
            </Box>
          </Skeleton>
        </Box>

        <Box alignSelf="center">
          <SideNavUserActions isMobile={isMobile} />
        </Box>
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
