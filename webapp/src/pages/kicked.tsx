import { Box, Button } from "@chakra-ui/react";
import { Navbar } from "../components/general/Navbar";
import { Container } from "../components/general/Container";
import { Hero } from "../components/general/Hero";
import Link from "next/link";

function Kicked() {
  return (
    <Box height="100vh">
      <Navbar />
      <Container height="100%">
        <Hero
          title="You got kicked! 😵"
          subText="Looks like the admin doesn't like you anymore."
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

export default Kicked;
