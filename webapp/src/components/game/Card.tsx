import { Box, Center } from "@chakra-ui/react";

export const Card = (props) => {
  return (
    <Box
      borderWidth="2px"
      borderColor="blue.dark"
      borderRadius="lg"
      h={{ base: "4.25rem", md: "5rem", lg: "5.5rem" }}
      w={{ base: "2.5rem", md: "3rem", lg: "3.25rem" }}
      {...props}
    >
      <Center h="100%">{props.children}</Center>
    </Box>
  );
};
