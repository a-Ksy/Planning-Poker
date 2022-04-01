import {
  Link as ChakraLink,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";


import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";

const Index = () => (
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

export default Index;
