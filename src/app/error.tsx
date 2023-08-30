"use client"; // Error components must be Client Components

import GameButton from "@/ui/Button/GameButton";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleBackToMain = () => {
    window.location.replace("/");
  };

  return (
    <Center>
      <Box
        w="450px"
        p="15px 30px"
        border="#A0A0A3 3px solid"
        boxShadow={"7px 7px black"}
        borderRadius="0"
        bg="#29292D"
      >
        <Center flexDirection="column" my={3}>
          <Heading fontFamily="DungGeunMo" size="md" color="white">
            something went wrong!
          </Heading>
          <Flex gap={4}>
            <GameButton
              w="150px"
              size="sm"
              mt={6}
              text="back to main"
              onClick={handleBackToMain}
            />
            <GameButton
              w="150px"
              size="sm"
              mt={6}
              text="try again"
              onClick={reset}
            />
          </Flex>
        </Center>
      </Box>
    </Center>
  );
}
