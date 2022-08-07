import {
  Box,
  Center,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { User } from "../../../features/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { voteCardValues, gameStates } from "../../../constants";
import { Card } from "../Card";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { setKickedUserId } from "../../../features/room";

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

  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      if (hasUserVoted()) {
        return "blue.dark";
      }

      return "gray.400";
    }
  };

  const getBorderWidthBasedOnState = () => {
    if (gameState === gameStates.IN_PROGRESS) {
      return "none";
    } else if (gameState === gameStates.CARDS_REVEALED) {
      return "2px";
    }
  };

  const getVote = () => {
    if (!hasUserVoted()) {
      return "";
    }

    if (votes[user.id] === voteCardValues.CONFUSED) {
      return "?";
    }

    return votes[user.id];
  };

  const kickUserButton = (
    <Box
      as="button"
      zIndex={2}
      color="red.400"
      cursor="pointer"
      position="absolute"
      right="100%"
      top="-15%"
      opacity="1"
      onClick={onOpen}
    >
      <Tooltip
        label="kick player"
        fontSize="xs"
        hasArrow
        placement="left"
        bg="gray"
        textColor="white"
      >
        <SmallCloseIcon />
      </Tooltip>
    </Box>
  );

  const handleKickUser = () => {
    dispatch(setKickedUserId(user.id));
    onClose();
  };
  const areYouSureModal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You are about to kick a user 😬</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This will kick{" "}
          <Text display="inline" fontWeight="bold">
            {user?.name}
          </Text>{" "}
          from the room. Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={() => handleKickUser()}>
            Kick
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box>
      <Center>
        <Card
          opacity={user.isAFK && 0.5}
          background={getBgBasedOnState()}
          borderWidth={getBorderWidthBasedOnState()}
          borderColor={getBorderColorBasedOnState()}
          display="block"
          position="relative"
        >
          {id === admin?.id && user.id !== id && kickUserButton}
          {areYouSureModal}
          {gameState === gameStates.CARDS_REVEALED && (
            <Text
              textAlign="center"
              color="blue.dark"
              fontWeight="bold"
              fontSize="lg"
            >
              {getVote()}
            </Text>
          )}
        </Card>
      </Center>
      <Center>
        {admin?.id === user.id && (
          <Text mr={2} fontSize="s" mt={2}>{`👑`}</Text>
        )}
        {user.isAFK && <Text mr={2} fontSize="s" mt={2}>{`😴`}</Text>}
        <Text
          isTruncated
          textAlign="center"
          mt={2}
          fontWeight="semibold"
          maxWidth="6rem"
          opacity={user.isAFK && 0.2}
        >
          {user.name}
        </Text>
      </Center>
    </Box>
  );
};
