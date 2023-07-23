"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Title } from "./Title";

interface IntroProps {
  children: React.ReactNode;
}

export const Intro = ({ children }: IntroProps) => {
  const router = useRouter();

  return (
    <Box h="100%" w="100%">
      <Flex>
        <Box>42 SEOUL</Box>
        <Spacer />
        <Box>ft_transcendence</Box>
      </Flex>
      <Center>
        <Box pt="200px">
          <Title />
          <Center my={10}>{children}</Center>
        </Box>
      </Center>
      <Flex>
        <Box position="absolute" bottom="55px">
          ⓒ copyright blablabla
        </Box>
        <Spacer />
        <Box
          position="absolute"
          bottom="55px"
          right="80px"
          onClick={() => {
            router.push(
              `https://github.com/orgs/junkpark-the-graduate/repositories`
            );
          }}
        >
          ↗ github
        </Box>
      </Flex>
    </Box>
  );
};
