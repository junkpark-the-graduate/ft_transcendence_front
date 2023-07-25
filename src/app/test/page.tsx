"use client";

import { AbsoluteCenter, Box, Center } from "@chakra-ui/react";

export default function page() {
  return (
    <Box bg="gray" w="full" h="full">
      <AbsoluteCenter verticalAlign={"center"}>
        <Box border="white 1px solid">hello</Box>
      </AbsoluteCenter>
    </Box>
  );
}
