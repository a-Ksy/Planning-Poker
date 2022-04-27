import { Grid, Box, Text } from "@chakra-ui/react";
import { VoteCard } from "./VoteCard";
import { voteCardValues } from "../constants";

export const VoteCards = () => {
  const sequence: number[] = [
    0,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55,
    89,
    voteCardValues.CONFUSED,
  ];

  return (
    <Box>
      <Text fontSize="lg" textAlign="center" mb={5}>
        Choose your card 👇
      </Text>
      <Grid templateColumns={`repeat(${sequence.length}, 1fr)`} gap={5}>
        {sequence.map((value) => {
          return <VoteCard key={value} value={value} />;
        })}
      </Grid>
    </Box>
  );
};
