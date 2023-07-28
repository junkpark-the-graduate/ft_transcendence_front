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
    <FullBox>
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
        <Box position="absolute" bottom="5vh">
          ⓒ copyright blablabla
        </Box>
        <Spacer />
        <Box
          as="button"
          position="absolute"
          bottom="5vh"
          right="8vh"
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
