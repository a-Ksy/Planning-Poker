import {
  Grid,
  GridItem,
  Flex,
  Spacer,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { UserCard } from "./user/UserCard";
import { GameTable } from "./GameTable";
import { useAppSelector } from "../../app/hooks";

export const GameGrid = () => {
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
        <UserCard user={users[8]} />
      </GridItem>
      <GridItem>
        <Flex>
          <UserCard user={users[4]} />
          <Spacer />
          <UserCard closed user={users[0]} />
          <Spacer />
          <UserCard user={users[5]} />
        </Flex>
      </GridItem>
      <GridItem>
        <UserCard user={users[9]} />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <UserCard user={users[2]} />
        </Center>
      </GridItem>
      <GridItem>
        <GameTable />
      </GridItem>
      <GridItem>
        <Center h="100%">
          <UserCard user={users[3]} />
        </Center>
      </GridItem>
      <GridItem mt={5}>
        <UserCard user={users[10]} />
      </GridItem>
      <GridItem mt={5}>
        <Flex>
          <UserCard user={users[6]} />
          <Spacer />
          <UserCard user={users[1]} />
          <Spacer />
          <UserCard user={users[7]} />
        </Flex>
      </GridItem>
      <GridItem mt={5}>
        <UserCard user={users[11]} />
      </GridItem>
    </Grid>
  );
};
