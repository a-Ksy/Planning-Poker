import { useState } from "react";
import {
  FormControl,
  Input,
  Text,
  Stack,
  Box,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { Navbar } from "../components/general/Navbar";
import { Container } from "../components/general/Container";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { localConstants, ROOM_NAME_INPUT_LIMIT } from "../constants";
import { useAppDispatch } from "../app/hooks";
import { setHistory } from "../features/history";

function getStoredRoomName(): string {
  if (typeof window !== "undefined" && window.localStorage) {
    const roomName: string = localStorage.getItem(localConstants.ROOM_NAME_KEY);
    if (roomName === null || roomName === undefined) {
      return "";
    }
    return roomName;
  }
}

function NewGame() {
  const [name, setName] = useState(getStoredRoomName());
  const handleNameChange = (e) => setName(e.target.value);
  const dispatch = useAppDispatch();

  const handleNewGame = () => {
    dispatch(setHistory("NewGame"));
    localStorage.setItem(localConstants.ROOM_NAME_KEY, name);
  };

  const isError = name?.length >= ROOM_NAME_INPUT_LIMIT;

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
            Choose a name for your game
          </Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack spacing="4rem" p="2rem">
              <FormControl isRequired isInvalid={isError}>
                <Input
                  id="name"
                  placeholder="e.g sprint-planning-2"
                  value={name}
                  onChange={handleNameChange}
                />
                {isError && (
                  <FormErrorMessage>
                    Room name should be less than {ROOM_NAME_INPUT_LIMIT}{" "}
                    characters.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Link href="/newplayer">
                <Button
                  type="submit"
                  width="full"
                  colorScheme="yellow"
                  isDisabled={name === "" || isError}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => handleNewGame()}
                >
                  Next
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default NewGame;
