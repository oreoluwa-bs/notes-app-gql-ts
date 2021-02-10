import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RRLink } from "react-router-dom";
import { NotesLogo } from "../../components/icons";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <Box minHeight="100vh" position="relative">
      <Box
        as="header"
        position="absolute"
        width="100%"
        bgGradient={{
          base: "linear(to-b, blackAlpha.300, transparent)",
          //   lg: "none",
        }}
      >
        <Box
          maxWidth={{ xl: "110em" }}
          py="0.5rem"
          px={{ base: "1rem" }}
          mx="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <NotesLogo fontSize={50} />
          <Box as="nav">
            <Stack direction="row" spacing={4} align="center">
              <Link
                as={RRLink}
                to="/signin"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  colorScheme="blackAlpha"
                  bg="blackAlpha.500"
                  color="white"
                >
                  Sign In
                </Button>
              </Link>
              <Link
                as={RRLink}
                to="/signup"
                _hover={{ textDecoration: "none" }}
              >
                <Button colorScheme="green" bg="primary.base">
                  Get Started
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir={{ base: "column-reverse", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          flex="1"
          px={{ base: "2.5rem", md: "6.5rem" }}
          py={{ base: "2rem" }}
        >
          <Heading mb="1rem" fontSize="5xl">
            Note taking made easy
          </Heading>
          <Text mb="1rem" width={{ lg: "77%" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            minus nisi eum ducimus eligendi exercitationem praesentium,
            doloremque cupiditate. Reiciendis corporis aliquid a eligendi
            sapiente quod ullam eos labore repellat repellendus!
          </Text>
          <Link as={RRLink} to="/demo" _hover={{ textDecoration: "none" }}>
            <Button colorScheme="green" bg="primary.base">
              Explore demo now
            </Button>
          </Link>
        </Box>
        <Box
          flex="1"
          minHeight={{ base: "50vh", lg: "100vh" }}
          width="100%"
          bgRepeat="no-repeat"
          bgPosition={{ base: "bottom 50% center", lg: "right" }}
          bgSize={{ base: "cover" }}
          bgImg={`url(${
            require("../../assets/images/hero__image.jpeg").default
          })
            `}
        ></Box>
      </Box>
    </Box>
  );
};

export default HomePage;
