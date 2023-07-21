"use client";

import BlockingList from "@/ui/Lists/BlockingList";
import BaseHeading from "@/ui/Typo/Heading";
import { Box, Center, Divider } from "@chakra-ui/react";

export default function BlockedUsers() {
  return (
    <Center>
      <Box bg="#29292D" w="500px" p="40px 60px" borderRadius={"15px"}>
        <BaseHeading text="blocked users" />
        <Divider mt={3} mb={5} />
        <BlockingList />
      </Box>
    </Center>
  );
}
