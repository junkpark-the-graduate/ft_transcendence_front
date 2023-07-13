"use client";

import { Box, Divider, Flex } from "@chakra-ui/react";
import FollowButton from "../../ui/Button/FollowButton";
import FollowingList from "../../ui/Lists/FollowingList";

export default function Test() {
  return (
    <Flex>
      <Box>
        {">"} following list
        <FollowingList />
        <Divider my={3} />
        user1: <FollowButton userId={98006} following={1} />
        user2: <FollowButton userId={98006} following={2} />
        user3: <FollowButton userId={98006} following={3} />
        user4: <FollowButton userId={98006} following={4} />
      </Box>
    </Flex>
  );
}
