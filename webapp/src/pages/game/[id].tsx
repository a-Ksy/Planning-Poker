import { useState } from "react";
import { Text, Stack, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";

import { useAppDispatch } from "../../app/hooks";
import { Poker } from "../../components/Poker";

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
        <Poker />
      </Container>
    </Box>
  );
}

export default Game;
