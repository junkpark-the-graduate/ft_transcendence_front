"use client";

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

export const Title = () => {
  return (
    <Box>
      <Flex>
        <Heading
          fontFamily="DungGeunMo"
          size="md"
          color="white"
          fontSize="120px"
          mx={3}
          textShadow="black 8px 8px"
        >
          Ping
        </Heading>
        <Heading
          fontFamily="DungGeunMo"
          size="md"
          color="white"
          fontSize="120px"
          mx={3}
          textShadow="black 8px 8px"
        >
          Pong
        </Heading>
      </Flex>
    </Box>
  );
};
