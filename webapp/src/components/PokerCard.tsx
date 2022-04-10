import { Box, Center, Text } from "@chakra-ui/react";
import { User } from "../features/user";
import { useAppSelector } from "../app/hooks";

export const PokerCard = (props) => {
  const { closed, user }: { closed: boolean; user: User } = props;

  const { admin }: { admin: User } = useAppSelector((state) => state.room);

  if (user == undefined || user == null) {
    return null;
  }

  return (
    <Box>
      <Center>
        <Box
          bg={closed ? "blue.300" : "gray.200"}
          p={4}
          borderRadius="xl"
          h="5rem"
          w="3rem"
          border={admin.id === user.id && "3px solid #ECC94B"}
        />
      </Center>
      <Center>
        <Text
          isTruncated
          textAlign="center"
          mt={1.5}
          fontWeight="semibold"
          maxWidth="6rem"
        >
          {user.name}
        </Text>
      </Center>
    </Box>
  );
};
