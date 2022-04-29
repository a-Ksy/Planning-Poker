import { useColorMode, Flex, Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Navbar = () => {
  return (
    <Flex position="fixed" p={5}>
      <Box p="3">
        <Link href="/">
          <Heading size="md" _hover={{ cursor: "pointer" }}>
            Planning Poker
          </Heading>
        </Link>
      </Box>
      <DarkModeSwitch />
    </Flex>
  );
};
