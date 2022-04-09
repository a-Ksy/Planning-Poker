import { Flex, Box, Center, Text } from "@chakra-ui/react";

export const PokerTable = () => {
  return (
    <Flex position="fixed" p={5}>
      <Box
        bg="#D7E9FF"
        w={{ base: "50vw", md: "30vw", lg: "20vw" }}
        h="18vh"
        p={4}
        borderRadius="2xl"
        borderWidth="1px"
        alignItems="center"
      >
        <Center h="100%">
          <Text fontSize="lg" textAlign="center" color="blue.300">
            Waiting for other player's votes...
          </Text>
        </Center>
      </Box>
    </Flex>
  );
};
