import { Box, Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { HiPlus } from "react-icons/hi";

interface WelcomeProps {}

const WelcomePage = (props: WelcomeProps) => {
  return (
    <Box minHeight="100vh" py="30px">
      <Box width={{ lg: "40%" }}>
        <VStack spacing={4} alignItems="flex-start">
          <Heading>Welcome</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui saepe
            sequi voluptatem repellat adipisci quam libero numquam, nisi laborum
            consectetur a mollitia. Similique, corrupti est deserunt consectetur
            eos consequatur perspiciatis!
          </Text>
          <Button
            rightIcon={<Icon as={HiPlus} />}
            bgColor="primary.base"
            colorScheme="green"
          >
            Create a new note
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default WelcomePage;
