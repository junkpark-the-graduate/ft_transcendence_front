"use client";

import { Flex, Divider, Box, Heading, Center } from "@chakra-ui/react";
import UserHistory from "./UserHistory";
import UserDetail from "./UserDetail";
import FriendList from "@/ui/Lists/FriendList";
import BaseHeading from "@/ui/Typo/Heading";

export default function Dashboard() {
  return (
    <Flex p={4} direction="column">
      <UserDetail />
      <Divider mt={2} mb={4} />
      <Flex>
        <UserHistory />
        <Box flex={2} px={5} borderLeft="1px solid #E2E8F0">
          <BaseHeading text="Friend List" size="md" mb={2} />
          <FriendList />
        </Box>
      </Flex>
    </Flex>
  );
}
