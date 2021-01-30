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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link as RRLink, RouteComponentProps } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { AuthContext, AuthContextType } from "../../store/context/auth";

interface SignUpProps extends RouteComponentProps {}

interface ISignUpInput {
  email: string;
  password: string;
}

const SignUpPage = (props: SignUpProps) => {
  const { handleSignUp } = useContext(AuthContext) as AuthContextType;
  const { register, errors, handleSubmit } = useForm<ISignUpInput>();
  const [showPasswordText, setShowPasswordText] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const altTextColor = useColorModeValue("gray.500", "gray.400");
  const inputBG = useColorModeValue("gray.100", "gray.900");

  const onSubmit = async (data: ISignUpInput) => {
    await handleSignUp(data);
    props.history.push("/app");
  };

  return (
    <>
      <Navbar />
      <Center
        height="100vh"
        bg="purple.500"
        bgGradient="linear(to-r, secondary, purple.600)"
      >
        <Box
          bg={bg}
          minWidth={{ base: "85%", md: "500px" }}
          borderRadius="xl"
          padding="2rem"
        >
          <Heading>Sign Up</Heading>
          <Text color={altTextColor}>Enter your account credentials</Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" my="1rem" position="relative">
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={!!errors.email}
                type="email"
                name="email"
                bg={inputBG}
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
                  bg={inputBG}
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
                    bg={inputBG}
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
              alignItems="center"
            >
              <Button
                alignSelf="stretch"
                type="submit"
                colorScheme="purple"
                bg="secondary"
                color="white"
                mb="5px"
              >
                Create my account
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
                to="/signin"
                color={altTextColor}
                _hover={{ color: "primary.base" }}
                // py="1rem"
              >
                <Text>Already have an account? Sign in</Text>
              </Link>
            </FormControl>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default SignUpPage;
