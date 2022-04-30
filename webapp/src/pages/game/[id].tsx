import { Center, Box, Spacer } from "@chakra-ui/react";
import { Navbar } from "../../components/general/Navbar";
import { Container } from "../../components/general/Container";
import { useAppSelector } from "../../app/hooks";
import { GameGrid } from "../../components/game/GameGrid";
import { VoteCards } from "../../components/game/voting/VoteCards";
import UserPersistency from "../../components/wrappers/UserPersistency";
import { WSWrapper } from "../../components/wrappers/WSWrapper";
import { gameStates } from "../../constants";
import { VotingResult } from "../../components/game/result/VotingResult";

function Game() {
  const { users, gameState } = useAppSelector((state) => state.room);

  const getBottomContentBasedOnGameState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      return <VoteCards />;
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return <VotingResult />;
    }
  };

  if (users !== null) {
    return (
      <WSWrapper>
        <UserPersistency />
        <Box height="100vh">
          <Navbar isGame />
          <Container h="100vh" flexDirection="column" pb={10} pt={20}>
            <Center h="100%" w="100%">
              <GameGrid />
            </Center>
            <Spacer />
            <Center w="100%">{getBottomContentBasedOnGameState()}</Center>
          </Container>
        </Box>
      </WSWrapper>
    );
  }

  return <UserPersistency />;
}

export default Game;
