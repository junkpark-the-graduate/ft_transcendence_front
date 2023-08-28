"use client";

import GameButton from "@/ui/Button/GameButton";
import { Box, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      w="300px"
      alignSelf="center"
      bg="#29292D"
      px={10}
      py={5}
      border={"white 2px solid"}
      boxShadow={"7px 7px black"}
    >
      <Text fontSize={24} mx={2} textAlign="center">
        404: Not Found
      </Text>
      <Center>
        <GameButton
          mt={6}
          mb={2}
          w="150px"
          text="go back"
          onClick={() => {
            router.back();
          }}
        />
      </Center>
    </Box>
  );
}
