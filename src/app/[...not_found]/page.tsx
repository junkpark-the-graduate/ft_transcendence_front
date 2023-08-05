"use client";

import GameButton from "@/ui/Button/GameButton";
import { Box, Text } from "@chakra-ui/react";
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
      <Text fontSize={24}>404: Not Found</Text>
      <GameButton
        mt={6}
        mb={2}
        text="back"
        onClick={() => {
          router.back();
        }}
      />
    </Box>
  );
}
