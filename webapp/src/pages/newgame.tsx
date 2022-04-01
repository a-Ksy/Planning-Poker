import { useState } from "react";
import {
  FormControl,
  Input,
  Text,
  Stack,
  Box,
  Button,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Container } from "../components/Container";

function NewGame() {
  const [name, setName] = useState("");
  const handleNameChange = (e) => setName(e.target.value);

  return (
    <Box height="100vh">
      <Navbar />
      <Container
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack flexDir="column" justifyContent="center" alignItems="center">
          <Text fontSize="3xl">Choose a name for your game</Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack spacing="4rem" p="2rem">
              <FormControl>
                <Input
                  id="name"
                  placeholder="e.g planning-sprint-3"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <Button type="submit" width="full" colorScheme="red">
                Create Game
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default NewGame;