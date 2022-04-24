import { Grid, GridItem, Text } from "@chakra-ui/react";
import { VoteCard } from "./VoteCard";

export const VoteCards = () => {
  // null is selected when the user is not sure about their vote.
  const sequence: number[] = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, null];

  return (
    <Grid templateColumns={`repeat(${sequence.length}, 1fr)`} gap={9}>
      {sequence.map((value) => {
        return <VoteCard key={value} value={value} />;
      })}
    </Grid>
  );
};
