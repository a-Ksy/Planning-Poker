import { FormControl, FormLabel, useColorMode, Switch } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const sunIcon = (
    <svg
      fill="currentColor"
      stroke="currentColor"
      width="24"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      ></path>
    </svg>
  );

  const moonIcon = (
    <svg
      fill="currentColor"
      stroke="currentColor"
      width="24"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      ></path>
    </svg>
  );

  return (
    <FormControl
      position="fixed"
      top="7"
      right="2rem"
      width="fit-content"
      display="flex"
      alignItems="center"
    >
      <FormLabel mb="0">{isDark ? sunIcon : moonIcon}</FormLabel>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
    </FormControl>
  );
};
