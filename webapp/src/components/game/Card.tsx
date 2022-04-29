import { Box, Center } from "@chakra-ui/react";

export const Card = (props) => {
  return (
    <Box
      borderWidth="2px"
      borderColor="blue.dark"
      borderRadius="lg"
      h="5.5rem"
      w="3.25rem"
      {...props}
    >
      <Center h="100%">{props.children}</Center>
    </Box>
  );
};
