"use client";

import { Flex, Divider } from "@chakra-ui/react";
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
        <FriendList />
      </Flex>
      <Divider my={4} />
    </Flex>
  );
}
