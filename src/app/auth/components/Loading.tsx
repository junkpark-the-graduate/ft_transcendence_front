"use client";

import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";

export const Loading = () => {
  return (
    <Center>
      <Box pt={20}>
        <Heading fontFamily="DungGeunMo" size="md" color="white">
          welcome to ping-pong !
        </Heading>
        <Center flexDirection="column"></Center>
        <Center mt={6}>
          <BaseButton
            isLoading
            loadingText="sign in"
            spinnerPlacement="start"
            text="sign in 42 intra"
            onClick={() => {}}
          />
        </Center>
      </Box>
    </Center>
  );
};
