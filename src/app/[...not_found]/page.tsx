"use client";

import GameButton from "@/ui/Button/GameButton";
import { Box, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
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
      <Divider my={2} borderColor="#A0A0A3" />
      <Text fontSize={16} mx={2}>
        you are not supposed to be here...
      </Text>
      <GameButton
        mt={6}
        mb={2}
        text="sorry"
        onClick={() => {
          router.back();
        }}
      />
    </Box>
  );
}
