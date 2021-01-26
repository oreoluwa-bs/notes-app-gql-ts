import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link as RRLink } from "react-router-dom";
import Navbar from "../../components/Navbar";

interface Props {}

interface ISignInInput {
  email: string;
  password: string;
}

const LoginPage = (props: Props) => {
  const [showPasswordText, setShowPasswordText] = useState(false);
  const { register, errors, handleSubmit } = useForm<ISignInInput>();

  const onSubmit = (data: ISignInInput) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <Center
        height="100vh"
        bg="green.500"
        bgGradient="linear(to-r, primary.base, primary.alt)"
      >
        <Box
          bg="white"
          minWidth={{ base: "85%", md: "500px" }}
          borderRadius="xl"
          padding="2rem"
        >
          <Heading>Sign In</Heading>
          <Text color="gray.500">Enter your sign in credentials</Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" my="1rem" position="relative">
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={!!errors.email}
                type="email"
                name="email"
                bg="gray.100"
                border="none"
                ref={register({
                  required: {
                    value: true,
                    message: "Email Address is required",
                  },
                })}
              />

              <Box position="absolute" mt="5px">
                <Text color="red.400" fontSize="xs">
                  {errors.email?.message}
                </Text>
              </Box>
            </FormControl>

            <FormControl id="password" my="1rem" position="relative">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr={0}
                  isInvalid={!!errors.password}
                  bg="gray.100"
                  border="none"
                  type={showPasswordText ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  ref={register({
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 6,
                      message: "Password must have a minimum of 6 characters",
                    },
                  })}
                />
                <InputRightElement>
                  <IconButton
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    aria-label="Toggle show password"
                    icon={
                      showPasswordText
                        ? <Icon as={HiEyeOff} color="gray.500" /> ?? "Hide"
                        : <Icon as={HiEye} color="gray.500" /> ?? "Show"
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <Box position="absolute" mt="5px">
                <Text color="red.400" fontSize="xs">
                  {errors.password?.message}
                </Text>
              </Box>
            </FormControl>

            <FormControl
              pt="1rem"
              display="flex"
              flexDirection="column"
              // justifyContent="center"
              alignItems="center"
            >
              <Button
                // alignSelf="flex-end"
                alignSelf="stretch"
                type="submit"
                colorScheme="green"
                bg="primary.base"
                mb="5px"
              >
                Sign In to my account
              </Button>
              <Box
                py={2}
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
              >
                <Box h="1px" bg="gray.300" flex="1" />
                <Text fontWeight="bold" color="gray.500" px="10px">
                  OR
                </Text>
                <Box h="1px" bg="gray.300" flex="1" />
              </Box>
              <Link
                as={RRLink}
                to="/signup"
                color="gray.600"
                _hover={{ color: "secondary" }}
                // py="1rem"
              >
                <Text>Don't have an account? Join Us</Text>
              </Link>
            </FormControl>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default LoginPage;
