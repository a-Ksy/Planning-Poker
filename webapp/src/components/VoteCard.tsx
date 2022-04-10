import { Box, Center, Text, useColorMode } from "@chakra-ui/react";

export const VoteCard = (props) => {
  const { value }: { value: number } = props;

  const { colorMode } = useColorMode();
  const bgColorHovered = { light: "blue.100", dark: "blue.900" };

  return (
    <Box
      borderWidth="2px"
      borderColor="blue.400"
      borderRadius="xl"
      h="5rem"
      w="3rem"
      cursor="pointer"
      transition="0.3s ease"
      _hover={{
        bg: bgColorHovered[colorMode],
      }}
    >
      <Center h="100%">
        <Text fontWeight="bold" color="blue.400">
          {value === null ? "?" : value}
        </Text>
      </Center>
    </Box>
  );
};
