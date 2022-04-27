import { Text, VStack, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";
import { useAppSelector } from "../../app/hooks";
import { Poker } from "../../components/Poker";
import { VoteCards } from "../../components/VoteCards";
import UserPersistency from "../../components/UserPersistency";
import { WSWrapper } from "../../components/WSWrapper";

function Game() {
  const { users } = useAppSelector((state) => state.room);

  if (users !== null) {
    return (
      <WSWrapper>
        <UserPersistency />
        <Box height="100vh">
          <Navbar />
          <Container
            h="100vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <VStack spacing="5rem">
              <Poker />
              <VoteCards />
            </VStack>
          </Container>
        </Box>
      </WSWrapper>
    );
  }

  return <UserPersistency />;
}

export default Game;
