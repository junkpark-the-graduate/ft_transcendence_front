"use client";

import { Flex, Divider, Box, Heading } from "@chakra-ui/react";
import FriendList from "./FriendList";
import UserHistory from "./UserHistory";
import UserDetail from "./UserDetail";

export default function Dashboard() {
  return (
    <Flex p={4} direction="column">
      <Divider my={6} />
      <UserDetail />
      <Divider my={2} />
      <Flex mt={4}>
        <UserHistory />
        <Box flex={2} pl={4} borderLeft="1px solid #E2E8F0">
          <Heading size="md" mb={2}>
            Friend List
          </Heading>
          <FriendList />
        </Box>
      </Flex>
      <Divider my={4} />
    </Flex>
  );
}
