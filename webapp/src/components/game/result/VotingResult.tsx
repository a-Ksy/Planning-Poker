import { Flex, Box, Text } from "@chakra-ui/react";
import { Average } from "./Average";
import { Distribution } from "./Distribution";

export const VotingResult = () => {
  return (
    <Box>
      <Flex gap={10}>
        <Distribution />
        <Average />
      </Flex>
    </Box>
  );
};
