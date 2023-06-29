"use client";

import React from "react";
import { Center, Heading } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import BaseBox from "@/ui/Box/Box";

export const Loading = () => {
  return (
    <Center>
      <BaseBox>
        <Heading size="md" color="white">
          welcome to ping-pong !
        </Heading>
        <Center flexDirection="column"></Center>
        <Center mt={6}>
          <BaseButton
            isLoading
            loadingText="sign in"
            spinnerPlacement="start"
            text=""
            onClick={() => {}}
          />
        </Center>
      </BaseBox>
    </Center>
  );
};
