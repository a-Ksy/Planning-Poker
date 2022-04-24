import { Box, Center, Text } from "@chakra-ui/react";
import { User } from "../features/user";
import { useAppSelector } from "../app/hooks";

export const PokerCard = (props) => {
  const { closed, user }: { closed: boolean; user: User } = props;

  const { admin }: { admin: User } = useAppSelector((state) => state.room);
  const { id } = useAppSelector((state) => state.user);

  if (user == undefined || user == null) {
    return null;
  }

  return (
    <Box>
      <Center>
        <Box
          bg={closed ? "blue.400" : "gray.400"}
          p={4}
          borderRadius="xl"
          h="5rem"
          w="3rem"
          borderWidth={id === user.id && "5px"}
          borderColor={id === user.id && "whiteAlpha.600"}
        />
      </Center>
      <Center>
        {admin.id === user.id && <Text mr={1.5} fontSize="xs">{`👑`}</Text>}
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
