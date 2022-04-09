import { Flex, Box, Center, Text, Grid, GridItem } from "@chakra-ui/react";
import { PokerTable } from "./PokerTable";

export const Poker = () => {
  return (
    <Grid
      gap="0.8rem"
      w="auto"
      minHeight="200px"
      m="0 auto"
      display="inline-grid"
      gridTemplateAreas={`"left top right" "left table right" "left bottom right"`}
      gridTemplateColumns="12rem 1fr 12rem"
      gridTemplateRows="8rem 1fr 8rem"
    >
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
      <GridItem>
        <PokerTable />
      </GridItem>
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
      <GridItem bg="tomato" />
    </Grid>
  );
};
