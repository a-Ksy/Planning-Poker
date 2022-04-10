import { Grid, GridItem, Flex, Spacer, Center } from "@chakra-ui/react";
import { PokerCard } from "./PokerCard";
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
      <GridItem>
        <PokerCard />
      </GridItem>
      <GridItem>
        <Flex>
          <PokerCard />
          <Spacer />
          <PokerCard hidden />
          <Spacer />
          <PokerCard />
        </Flex>
      </GridItem>
      <GridItem>
        <PokerCard />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard />
        </Center>
      </GridItem>
      <GridItem>
        <PokerTable />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard />
        </Center>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard />
      </GridItem>
      <GridItem mt={5}>
        <Flex>
          <PokerCard />
          <Spacer />
          <PokerCard />
          <Spacer />
          <PokerCard />
        </Flex>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard />
      </GridItem>
    </Grid>
  );
};
