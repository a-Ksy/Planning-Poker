import { Text, VStack, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Poker } from "../../components/Poker";
import { VoteCards } from "../../components/VoteCards";
import UserPersistency from "../../components/UserPersistency";

function Game() {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.room);
  return (
    <UserPersistency>
      <Box height="100vh">
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
            <Poker />
            <VoteCards />
          </VStack>
        </Container>
      </Box>
    </UserPersistency>
  );
}

export default Game;
