import { Box, Button } from "@chakra-ui/react";
import { Navbar } from "../components/general/Navbar";
import { Container } from "../components/general/Container";
import { Hero } from "../components/general/Hero";
import Link from "next/link";

function Oops() {
  return (
    <Box height="100vh">
      <Navbar />
      <Container height="100%">
        <Hero
          title="Ooops! 😢"
          subText="Looks like the room doesn't exist, is not available, or I don't know..."
        >
          <Link href="/">
            <Button variant="solid" size="lg">
              Return to home
            </Button>
          </Link>
        </Hero>
      </Container>
    </Box>
  );
}

export default Oops;
