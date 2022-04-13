import { Text, VStack, Box, Spinner } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Poker } from "../../components/Poker";
import { VoteCards } from "../../components/VoteCards";
import UserPersistency from "../../components/UserPersistency";
import { useState } from "react";

function Game() {
  const dispatch = useAppDispatch();
  const { name, users, pending } = useAppSelector((state) => state.room);
  console.log(name, users, pending);
  return (
    <Box height="100vh">
      <UserPersistency />
      <Navbar />
      <Container
        h="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing="5rem">
          <Text fontSize="xl" fontWeight="semibold">
            {name}
          </Text>
          {users === null || pending ? <Spinner /> : <Poker />}
          <VoteCards />
        </VStack>
      </Container>
    </Box>
  );
}

export default Game;
