import { Link as ChakraLink, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKanyeQuote } from "../features/kanye";
import { wrapper } from "../app/store";

const Index = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector((state) => state.kanyeQuote);

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
        <Button
          variant="solid"
          colorScheme="green"
          size="lg"
          onClick={() => dispatch(getKanyeQuote())}
        >
          Generate Kanye quote
        </Button>
      </Container>
      <Footer>
        <ChakraLink isExternal href="https://github.com/a-Ksy/Planning-Poker">
          <Text>Source Code ⚡</Text>
          <Text>{data && `${data.quote}`}</Text>
        </ChakraLink>
      </Footer>
    </Container>
  );
};

Index.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(getKanyeQuote());
    }
);

export default Index;
