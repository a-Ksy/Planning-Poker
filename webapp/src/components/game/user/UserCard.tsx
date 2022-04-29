import { Box, Center, Text, useColorMode } from "@chakra-ui/react";
import { User } from "../../../features/user";
import { useAppSelector } from "../../../app/hooks";
import { voteCardValues, gameStates } from "../../../constants";
import { Card } from "../Card";

const closedCardBackground = `background-color: #4299E1;  
background: linear-gradient(135deg, #ffffff55 25%, transparent 25%) -10px 0/ 20px 20px, 
linear-gradient(225deg, #ffffff 25%, transparent 25%) -10px 0/ 20px 20px, 
linear-gradient(315deg, #ffffff55 25%, transparent 25%) 0px 0/ 20px 20px, 
linear-gradient(45deg, #ffffff 25%, #3993FF 25%) 0px 0/ 20px 20px;`;

export const UserCard = (props) => {
  const { user }: { user: User } = props;

  const { admin, gameState }: { admin: User; gameState: string } =
    useAppSelector((state) => state.room);
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

  const userOwnsTheCard = id === user.id;
  const { colorMode } = useColorMode();
  const borderColor = { light: "blackAlpha.200", dark: "blackAlpha.400" };

  const getBgBasedOnState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      if (hasUserVoted()) {
        return closedCardBackground;
      }
      return "gray.200";
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return "none";
    }
  };

  const getBorderColorBasedOnState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      if (userOwnsTheCard) {
        return borderColor[colorMode];
      }
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return "blue.dark";
    }
  };

  const getBorderWidthBasedOnState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      return "none";
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return "2px";
    }
  };

  return (
    <Box>
      <Center>
        <Card
          p={4}
          h="5rem"
          w="3rem"
          background={getBgBasedOnState()}
          borderWidth={getBorderWidthBasedOnState()}
          borderColor={getBorderColorBasedOnState()}
        >
          {gameState === gameStates.CARDS_REVEALED && hasUserVoted() && (
            <Text
              textAlign="center"
              color="blue.dark"
              fontWeight="bold"
              fontSize="lg"
            >
              {votes[user.id]}
            </Text>
          )}
        </Card>
      </Center>
      <Center>
        {admin.id === user.id && (
          <Text mr={2} fontSize="xs" mt={2}>{`👑`}</Text>
        )}
        <Text
          isTruncated
          textAlign="center"
          mt={2}
          fontWeight="semibold"
          maxWidth="6rem"
        >
          {user.name}
        </Text>
      </Center>
    </Box>
  );
};