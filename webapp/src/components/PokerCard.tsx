import { Box, Center, Text } from "@chakra-ui/react";
import { User } from "../features/user";
import { useAppSelector } from "../app/hooks";
import { voteCardValues } from "../constants";

export const PokerCard = (props) => {
  const { user }: { user: User } = props;

  const { admin }: { admin: User } = useAppSelector((state) => state.room);
  const { votes }: { votes: {} } = useAppSelector((state) => state.vote);
  const { id } = useAppSelector((state) => state.user);

  if (user == undefined || user == null) {
    return null;
  }

  const hasUserVoted = () => {
    return (
      votes[user.id] !== undefined &&
      votes[user.id] !== null &&
      votes[user.id] !== voteCardValues.NOT_SELECTED
    );
  };

  const closedCardBackground = `background-color: #4299E1; opacity: 0.8; 
    background: linear-gradient(135deg, #ffffff55 25%, transparent 25%) -10px 0/ 20px 20px, 
    linear-gradient(225deg, #ffffff 25%, transparent 25%) -10px 0/ 20px 20px, 
    linear-gradient(315deg, #ffffff55 25%, transparent 25%) 0px 0/ 20px 20px, 
    linear-gradient(45deg, #ffffff 25%, #4299E1 25%) 0px 0/ 20px 20px;`;

  return (
    <Box>
      <Center>
        <Box
          background={hasUserVoted() ? closedCardBackground : "gray.300"}
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
