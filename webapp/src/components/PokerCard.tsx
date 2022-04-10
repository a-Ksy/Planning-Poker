import { Box, Center, Text } from "@chakra-ui/react";

export const PokerCard = (props) => {
  const { hidden } = props;

  return (
    <Box>
      <Center>
        <Box
          bg={hidden ? "blue.300" : "gray.100"}
          p={4}
          borderRadius="xl"
          h="5rem"
          w="3rem"
        />
      </Center>
      <Text isTruncated maxWidth="6rem" textAlign="center" mt={1}>
        Atahan
      </Text>
    </Box>
  );
};
