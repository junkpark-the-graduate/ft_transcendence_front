"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { Title } from "./Title";
import FullBox from "../Box/FullBox";

interface IntroProps {
  children: React.ReactNode;
}

export const Intro = ({ children }: IntroProps) => {
  const router = useRouter();

  return (
    <FullBox px="40px" py="30px">
      <Flex>
        <Box>42 SEOUL</Box>
        <Spacer />
        <Box>ft_transcendence</Box>
      </Flex>
      <Center>
        <Box pt="25vh">
          <Title />
          <Center my={10}>{children}</Center>
        </Box>
      </Center>
      <Flex>
        <Box position="absolute" bottom="40px">
          ⓒ 2023 junkpark-the-graduate
        </Box>
        <Spacer />
        <Box
          as="button"
          position="absolute"
          bottom="40px"
          right="40px"
          onClick={() => {
            router.push(
              `https://github.com/orgs/junkpark-the-graduate/repositories`
            );
          }}
        >
          ↗ github
        </Box>
      </Flex>
    </FullBox>
  );
};
