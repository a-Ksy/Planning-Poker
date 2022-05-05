import { Box, Text, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { voteCardValues } from "../../../constants";

export const Average = () => {
  const { votes } = useAppSelector((state) => state.vote);

  const getAverage = () => {
    const votesMap = Object.entries(votes);
    if (votesMap.length === 0) {
      return;
    }

    var total = 0;
    var count = 0;
    for (const [_, voteValue] of votesMap) {
      if (
        voteValue === voteCardValues.CONFUSED ||
        voteValue === voteCardValues.NOT_SELECTED ||
        voteValue === voteCardValues.PRIVATE
      ) {
        continue;
      }
      total += voteValue as number;
      count += 1;
    }

    if (count === 0) {
      return null;
    }

    const avg = total / count;

    return Math.round(avg * 10) / 10;
  };

  const average = getAverage();

  if (average === null) {
    return null;
  }

  return (
    <Box>
      <Flex direction="column">
        <Text fontSize="lg" textAlign="center" color="gray.400">
          Average:
        </Text>
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          {average}
        </Text>
      </Flex>
    </Box>
  );
};
