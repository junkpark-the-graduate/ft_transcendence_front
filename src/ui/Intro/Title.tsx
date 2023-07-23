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
        >
          Ping
        </Heading>
        <Heading
          fontFamily="DungGeunMo"
          size="md"
          color="white"
          fontSize="120px"
          mx={3}
        >
          Pong
        </Heading>
      </Flex>
    </Box>
  );
};
