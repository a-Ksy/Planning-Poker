import { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Text,
  Stack,
  Box,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import router from "next/router";
import { Navbar } from "../components/general/Navbar";
import { Container } from "../components/general/Container";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createRoom, joinRoom } from "../features/room";
import { setName } from "../features/user";
import { localConstants, NAME_INPUT_LIMIT } from "../constants";

function getStoredUsername(): string {
  if (typeof window !== "undefined" && window.localStorage) {
    const username: string = localStorage.getItem(localConstants.USERNAME_KEY);
    if (username === null || username === undefined) {
      return "";
    }
    return username;
  }
}

function NewPlayer() {
  const dispatch = useAppDispatch();
  const { page, id } = useAppSelector((state) => state.history);
  const { pending } = useAppSelector((state) => state.room);

  useEffect(() => {
    if (page === "Landing") {
      router.push("/");
    }
  }, []);

  const [name, setUsername] = useState(getStoredUsername());
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const storeUsername = () => {
    localStorage.setItem(localConstants.USERNAME_KEY, name);
    dispatch(setName(name));
  };

  const handleRoomAction = () => {
    storeUsername();
    if (page === "NewGame") {
      handleCreateRoom();
    } else {
      handleJoinRoom();
    }
  };

  const handleCreateRoom = () => {
    const roomName: string = localStorage.getItem(localConstants.ROOM_NAME_KEY);
    dispatch(createRoom({ roomName, username: name })).then((data) => {
      const roomId: string = data.payload["room"]["id"];
      router.push(`/game/${roomId}`);
    });
  };

  const handleJoinRoom = () => {
    dispatch(joinRoom({ roomId: id, username: name })).then((data) => {
      const roomId: string = data.payload["room"]["id"];
      router.push(`/game/${roomId}`);
    });
  };

  const isError = name?.length >= NAME_INPUT_LIMIT;

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
              <FormControl isRequired isInvalid={isError}>
                <Input
                  id="name"
                  placeholder="e.g pokerface12"
                  value={name}
                  onChange={handleNameChange}
                />
                {!isError ? (
                  <FormHelperText>
                    Just to let other players know who you are 🌱
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Usename should be less than {NAME_INPUT_LIMIT} characters.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                isLoading={pending}
                loadingText="Preparing the room"
                type="submit"
                width="full"
                colorScheme="green"
                isDisabled={name === "" || isError}
                onClick={() => handleRoomAction()}
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
