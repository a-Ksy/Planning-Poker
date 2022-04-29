import { Box, Center, Text, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { revealCards } from "../../features/room";
import { voteCardValues, gameStates } from "../../constants";

export const GameTable = () => {
  const { votes } = useAppSelector((state) => state.vote);
  const { gameState } = useAppSelector((state) => state.room);

  const dispatch = useAppDispatch();

  const hasAnyoneVoted = () => {
    for (const [_, vote] of Object.entries(votes)) {
      if (vote !== voteCardValues.NOT_SELECTED) {
        return true;
      }
    }
    return false;
  };

  const handleRevealCards = () => {
    dispatch(revealCards(true));
  };

  const getTableContentBasedOnGameState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      if (hasAnyoneVoted()) {
        return (
          <Button
            _hover={{
              opacity: 0.6,
            }}
            type="submit"
            borderRadius="lg"
            bg="blue.dark"
            color="white"
            size="lg"
            onClick={() => handleRevealCards()}
          >
            Reveal cards
          </Button>
        );
      }

      return (
        <Text fontSize="xl" textAlign="center" color="gray.600">
          Pick your cards!
        </Text>
      );
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return (
        <Button
          _hover={{
            opacity: 0.6,
          }}
          type="submit"
          borderRadius="lg"
          bg="gray.600"
          color="white"
          size="lg"
          onClick={() => {}}
        >
          Start new voting
        </Button>
      );
    }
  };

  return (
    <Box
      bg="blue.light"
      w={{ base: "50vw", md: "30vw", lg: "19vw" }}
      h="17vh"
      p={4}
      borderRadius="3xl"
      alignItems="center"
    >
      <Center h="100%">{getTableContentBasedOnGameState()}</Center>
    </Box>
  );
};
