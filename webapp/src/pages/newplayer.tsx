import { useState } from "react";
import {
  FormControl,
  Input,
  Text,
  Stack,
  Box,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Container } from "../components/Container";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUsername, createRoom } from "../features/createRoom";

function NewPlayer() {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const dispatch = useAppDispatch();
  const { roomName }: { roomName: string } = useAppSelector(
    (state) => state.createRoom
  );

  const handleCreateRoom = () => {
    dispatch(setUsername(name));
    dispatch(createRoom({ roomName, username: name }));
  };

  return (
    <Box height="100vh">
      <Navbar />
      <Container
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack flexDir="column" justifyContent="center" alignItems="center">
          <Text fontSize="3xl">Choose a display name</Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack spacing="4rem" p="2rem">
              <FormControl isRequired>
                <Input
                  id="name"
                  placeholder="e.g pokerface12"
                  value={name}
                  onChange={handleNameChange}
                />
                <FormHelperText>
                  Just to let other players know who you are 🌱
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                width="full"
                colorScheme="green"
                isDisabled={name === ""}
                onClick={() => handleCreateRoom()}
              >
                Let's begin!
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default NewPlayer;
