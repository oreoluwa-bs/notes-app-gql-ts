import { Box, Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { RouteComponentProps } from "react-router-dom";
import { NoteContext, NoteContextType } from "../../store/context/note";

interface WelcomeProps {}

const WelcomePage = (props: RouteComponentProps<WelcomeProps>) => {
  const { history } = props;
  const { handleCreateNote } = useContext(NoteContext) as NoteContextType;
  return (
    <Box minHeight="100vh" p="35px">
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
            onClick={async () => {
              const res = await handleCreateNote();
              history.push(`/app/note/${res.doc.slug}`);
            }}
          >
            Create a new note
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default WelcomePage;
