import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}

const LoginPage = (props: Props) => {
  const [showPasswordText, setShowPasswordText] = useState(false);

  return (
    <Center
      height="100vh"
      bg="green.500"
      bgGradient="linear(to-r, primary.base, secondary.alt)"
    >
      <Box
        bg="white"
        minWidth={{ base: "85%", md: "500px" }}
        borderRadius="xl"
        padding="2rem"
      >
        <Heading>Sign In</Heading>
        <Text color="gray.500">Enter your login credentials</Text>

        <form>
          <FormControl id="email" py="1rem">
            <FormLabel>Email address</FormLabel>
            <Input type="email" bg="gray.100" border="none" />
          </FormControl>

          <FormControl id="password" py="1rem">
            <FormLabel>Password</FormLabel>
            {/* <Input  /> */}
            <InputGroup>
              <Input
                // pr="4.5rem"
                bg="gray.100"
                border="none"
                type={showPasswordText ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                >
                  {showPasswordText ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl
            id="submit"
            py="1rem"
            display="flex"
            justifyContent="flex-end"
          >
            <Button colorScheme="green" bg="primary.base">
              Sign In to my account
            </Button>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
};

export default LoginPage;
