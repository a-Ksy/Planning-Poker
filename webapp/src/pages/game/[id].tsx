import { useState } from "react";
import { Text, Stack, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";
import { PokerTable } from "../../components/PokerTable";

import { useAppDispatch } from "../../app/hooks";

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
        <PokerTable />
      </Container>
    </Box>
  );
}

export default Game;
