import { Box, Center, Text, useColorMode } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVoteCard } from "../../../features/vote";
import { voteCardValues } from "../../../constants";
import { Card } from "../Card";

export const VoteCard = (props) => {
  const { value }: { value: number } = props;

  const dispatch = useAppDispatch();
  const { selectedVoteCard }: { selectedVoteCard: Number } = useAppSelector(
    (state) => state.vote
  );

  const { colorMode } = useColorMode();
  const bgColorHovered = { light: "blue.50", dark: "blue.900" };

  const handleVoteCardClick = () => {
    if (selectedVoteCard === value) {
      dispatch(selectVoteCard(voteCardValues.NOT_SELECTED));
    } else {
      dispatch(selectVoteCard(value));
    }
  };

  return (
    <Card
      cursor="pointer"
      transition="0.2s ease"
      _hover={
        selectedVoteCard !== value && {
          bg: bgColorHovered[colorMode],
        }
      }
      onClick={() => handleVoteCardClick()}
      bg={selectedVoteCard === value ? "blue.dark" : "none"}
    >
      <Text
        fontWeight="bold"
        fontSize={{ lg: "lg", base: "md" }}
        color={selectedVoteCard === value ? "white" : "blue.dark"}
      >
        {value === voteCardValues.CONFUSED ? "?" : value}
      </Text>
    </Card>
  );
};
