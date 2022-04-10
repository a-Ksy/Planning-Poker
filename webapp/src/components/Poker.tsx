import { Grid, GridItem, Flex, Spacer, Center } from "@chakra-ui/react";
import { PokerCard } from "./PokerCard";
import { PokerTable } from "./PokerTable";

export const Poker = () => {
  let numPlayers = 8;

  function isCardVisible(index: number): boolean {
    return index >= 0 && index < numPlayers;
  }

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
        <PokerCard index={8} isCardVisible={isCardVisible} />
      </GridItem>
      <GridItem>
        <Flex>
          <PokerCard index={4} isCardVisible={isCardVisible} />
          <Spacer />
          <PokerCard index={0} closed isCardVisible={isCardVisible} />
          <Spacer />
          <PokerCard index={5} isCardVisible={isCardVisible} />
        </Flex>
      </GridItem>
      <GridItem>
        <PokerCard index={9} isCardVisible={isCardVisible} />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard index={2} isCardVisible={isCardVisible} />
        </Center>
      </GridItem>
      <GridItem>
        <PokerTable />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard index={3} isCardVisible={isCardVisible} />
        </Center>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard index={10} isCardVisible={isCardVisible} />
      </GridItem>
      <GridItem mt={5}>
        <Flex>
          <PokerCard index={6} isCardVisible={isCardVisible} />
          <Spacer />
          <PokerCard index={1} isCardVisible={isCardVisible} />
          <Spacer />
          <PokerCard index={7} isCardVisible={isCardVisible} />
        </Flex>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard index={11} isCardVisible={isCardVisible} />
      </GridItem>
    </Grid>
  );
};
