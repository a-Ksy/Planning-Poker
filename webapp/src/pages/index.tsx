import { Link as ChakraLink, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { Hero } from "../components/general/Hero";
import { Container } from "../components/general/Container";
import { DarkModeSwitch } from "../components/general/DarkModeSwitch";
import { Footer } from "../components/general/Footer";

const Index = () => {
  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Hero />
      <Container justifyContent="center" py={2}>
        <Link href="/newgame">
          <Button variant="solid" colorScheme="red" size="lg">
            Start new game
          </Button>
        </Link>
      </Container>
      <Footer>
        <ChakraLink isExternal href="https://github.com/a-Ksy/Planning-Poker">
          <Text>Source Code ⚡</Text>
        </ChakraLink>
      </Footer>
    </Container>
  );
};

export default Index;
