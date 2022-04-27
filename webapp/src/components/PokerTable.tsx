import { Box, Center, Text } from "@chakra-ui/react";

export const PokerTable = () => {
  return (
    <Box
      bg="blue.400"
      w={{ base: "50vw", md: "30vw", lg: "20vw" }}
      h="18vh"
      p={4}
      borderRadius="3xl"
      alignItems="center"
    >
      <Center h="100%">
        <Text fontSize="xl" textAlign="center" color="white">
          Pick your cards!
        </Text>
      </Center>
    </Box>
  );
};
