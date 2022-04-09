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

import { useAppDispatch } from "../app/hooks";
import { createRoom } from "../features/room";
import { setName } from "../features/user";
import { localConstants } from "../constants";

function getStoredUsername(): string {
  const username: string = localStorage.getItem(localConstants.USERNAME_KEY);
  if (username === null || username === undefined) {
    return "";
  }
  return username;
}

function NewPlayer() {
  const [name, setUsername] = useState(getStoredUsername());
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const dispatch = useAppDispatch();

  const handleCreateRoom = () => {
    localStorage.setItem(localConstants.USERNAME_KEY, name);
    dispatch(setName(name));

    const roomName: string = localStorage.getItem(localConstants.ROOM_NAME_KEY);
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
