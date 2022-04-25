import { Box, Center, Text, useColorMode } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectVoteCard } from "../features/vote";
import { voteCardValues } from "../constants";

export const VoteCard = (props) => {
  const { value }: { value: number } = props;

  const dispatch = useAppDispatch();
  const { selectedVoteCard }: { selectedVoteCard: Number } = useAppSelector(
    (state) => state.vote
  );

  const { colorMode } = useColorMode();
  const bgColorHovered = { light: "blue.100", dark: "blue.900" };

  const handleVoteCardClick = () => {
    if (selectedVoteCard === value) {
      dispatch(selectVoteCard(voteCardValues.NOT_SELECTED));
    } else {
      dispatch(selectVoteCard(value));
    }
  };

  return (
    <Box
      borderWidth="2px"
      borderColor="blue.400"
      borderRadius="xl"
      h="5rem"
      w="3rem"
      cursor="pointer"
      transition="0.2s ease"
      _hover={
        selectedVoteCard !== value && {
          bg: bgColorHovered[colorMode],
        }
      }
      onClick={() => handleVoteCardClick()}
      bg={selectedVoteCard === value ? "blue.400" : "none"}
    >
      <Center h="100%">
        <Text
          fontWeight="bold"
          color={selectedVoteCard === value ? "white" : "blue.400"}
        >
          {value === voteCardValues.CONFUSED ? "?" : value}
        </Text>
      </Center>
    </Box>
  );
};
