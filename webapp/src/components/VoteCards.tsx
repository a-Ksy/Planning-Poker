import { Grid, GridItem, Text } from "@chakra-ui/react";
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
    <Grid templateColumns={`repeat(${sequence.length}, 1fr)`} gap={9}>
      {sequence.map((value) => {
        return <VoteCard key={value} value={value} />;
      })}
    </Grid>
  );
};
