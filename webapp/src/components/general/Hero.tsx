import { Flex, Heading, VStack, Container, Text } from "@chakra-ui/react";

export const Hero = ({
  title,
  subText,
}: {
  title: string;
  subText: string;
}) => (
  <Flex height="100vh" justifyContent="center" alignItems="center">
    <VStack spacing="3rem">
      <Container centerContent maxW="container.xl">
        <Heading fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}>
          {title}
        </Heading>
      </Container>
      <Container centerContent maxW="container.xl">
        <Text fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} color="gray.400">
          {subText}
        </Text>
      </Container>
    </VStack>
  </Flex>
);

Hero.defaultProps = {
  title: "Planning Poker 🎲",
  subText: "Plan your next Sprint by voting on tasks!",
};
