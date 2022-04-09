import { useState } from "react";
import { Text, Stack, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";

import { useAppDispatch } from "../../app/hooks";
import { createRoom } from "../../features/room";
import { setName } from "../../features/user";
import { localConstants } from "../../constants";

function Game() {
  const dispatch = useAppDispatch();

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
          <Text fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}>Game</Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default Game;
