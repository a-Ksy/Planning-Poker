import { Box, Center, Text, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { voteCardValues } from "../constants";

export const PokerTable = () => {
  const { votes } = useAppSelector((state) => state.vote);

  const hasAnyoneVoted = () => {
    for (const [_, vote] of Object.entries(votes)) {
      if (vote !== voteCardValues.NOT_SELECTED) {
        return true;
      }
    }
    return false;
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
      <Center h="100%">
        {hasAnyoneVoted() ? (
          <Button
            _hover={{
              opacity: 0.6,
            }}
            type="submit"
            borderRadius="lg"
            bg="blue.dark"
            color="white"
            size="lg"
            onClick={() => {}}
          >
            Reveal cards
          </Button>
        ) : (
          <Text fontSize="xl" textAlign="center" color="gray.600">
            Pick your cards!
          </Text>
        )}
      </Center>
    </Box>
  );
};
