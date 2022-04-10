import { Box, Center, Text } from "@chakra-ui/react";

export const PokerCard = (props) => {
  const {
    index,
    closed,
    isCardVisible,
  }: { index: number; closed: boolean; isCardVisible: Function } = props;

  if (!isCardVisible(index)) {
    return null;
  }

  return (
    <Box>
      <Center>
        <Box
          bg={closed ? "blue.300" : "gray.200"}
          p={4}
          borderRadius="xl"
          h="5rem"
          w="3rem"
        />
      </Center>
      <Center>
        <Text
          isTruncated
          textAlign="center"
          mt={1.5}
          fontWeight="semibold"
          maxWidth="6rem"
        >
          Atahan
        </Text>
      </Center>
    </Box>
  );
};
