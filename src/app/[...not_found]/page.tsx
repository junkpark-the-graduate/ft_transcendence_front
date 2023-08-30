"use client";

import GameButton from "@/ui/Button/GameButton";
import { Box, Center, Divider, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

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
          <Divider my={4} />
          <Text fontSize={18} mx={2} textAlign="center">
            404: page not found
          </Text>
          <Center>
            <GameButton
              mt={6}
              mb={1}
              size="sm"
              w="150px"
              text="go back"
              onClick={() => {
                router.back();
              }}
            />
          </Center>
        </Center>
      </Box>
    </Center>
  );
}
