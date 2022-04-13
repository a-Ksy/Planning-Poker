import {
  Grid,
  GridItem,
  Flex,
  Spacer,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { PokerCard } from "./PokerCard";
import { PokerTable } from "./PokerTable";
import { useAppSelector } from "../app/hooks";

export const Poker = () => {
  const { users, pending } = useAppSelector((state) => state.room);

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
        <PokerCard user={users[8]} />
      </GridItem>
      <GridItem>
        <Flex>
          <PokerCard user={users[4]} />
          <Spacer />
          <PokerCard closed user={users[0]} />
          <Spacer />
          <PokerCard user={users[5]} />
        </Flex>
      </GridItem>
      <GridItem>
        <PokerCard user={users[9]} />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard user={users[2]} />
        </Center>
      </GridItem>
      <GridItem>
        <PokerTable />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <PokerCard user={users[3]} />
        </Center>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard user={users[10]} />
      </GridItem>
      <GridItem mt={5}>
        <Flex>
          <PokerCard user={users[6]} />
          <Spacer />
          <PokerCard user={users[1]} />
          <Spacer />
          <PokerCard user={users[7]} />
        </Flex>
      </GridItem>
      <GridItem mt={5}>
        <PokerCard user={users[11]} />
      </GridItem>
    </Grid>
  );
};
