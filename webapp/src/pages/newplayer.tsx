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
import router from "next/router";
import { Navbar } from "../components/Navbar";
import { Container } from "../components/Container";

import { useAppDispatch } from "../app/hooks";
import { createRoom, Room } from "../features/room";
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
  const dispatch = useAppDispatch();

  const [name, setUsername] = useState(getStoredUsername());
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCreateRoom = () => {
    // Set name to local storage and redux
    localStorage.setItem(localConstants.USERNAME_KEY, name);
    dispatch(setName(name));

    // Create the room and route to the room
    const roomName: string = localStorage.getItem(localConstants.ROOM_NAME_KEY);
    dispatch(createRoom({ roomName, username: name })).then((data) => {
      const room: Room = data.payload;
      router.push(`/game/${room.id}`);
    });
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
          <Text fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}>
            Choose a display name
          </Text>
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
