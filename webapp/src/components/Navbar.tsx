import { useColorMode, Flex, Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Flex position="fixed" p={5}>
      <Box p="3">
        <Link href="/">
          <Heading size="lg" _hover={{ cursor: "pointer" }}>
            Planning Poker
          </Heading>
        </Link>
      </Box>
      <DarkModeSwitch />
    </Flex>
  );
};
