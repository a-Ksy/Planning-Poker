import { Box, Text, Grid, Center, useColorMode } from "@chakra-ui/react";
import { Card } from "../Card";
import { voteCardValues } from "../../../constants";
import { useAppSelector } from "../../../app/hooks";

export const Distribution = () => {
  const { colorMode } = useColorMode();
  const borderColor = { light: "black", dark: "white" };

  const { votes } = useAppSelector((state) => state.vote);

  const getCountOfVotes = () => {
    const votesMap = Object.entries(votes);
    const votesCount = new Object();

    for (const [_, voteValue] of votesMap) {
      var val = voteValue as any;
      if (val === voteCardValues.NOT_SELECTED) {
        continue;
      }
      if (val === voteCardValues.CONFUSED) {
        val = "?";
      }
      const prevCount = votesCount[val];
      votesCount[val] = prevCount !== undefined ? prevCount + 1 : 1;
    }

    return votesCount;
  };

  const voteDistribution = Object.entries(getCountOfVotes());

  return (
    <Box>
      <Grid templateColumns={`repeat(${voteDistribution.length}, 1fr)`} gap={3}>
        {voteDistribution.map(([vote, num]) => {
          return (
            <Box key={vote} alignItems="center" opacity={vote === "?" && "0.5"}>
              <Center>
                <Card
                  h="4.5rem"
                  w="2.5rem"
                  borderColor={borderColor[colorMode]}
                  mb={2}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {vote}
                  </Text>
                </Card>
              </Center>
              <Text align="center">
                {num} {num === 1 ? "Vote" : "Votes"}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
