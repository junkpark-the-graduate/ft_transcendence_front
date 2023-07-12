"use client";

import { Box, Divider, Flex } from "@chakra-ui/react";
import FollowButton from "./FollowButton";
import FollowingList from "./FollowingList";

export default function Test() {
  return (
    <Flex>
      <Box>
        {">"} following list
        <FollowingList />
        <Divider my={3} />
        <FollowButton userId={98006} following={1} />
        <FollowButton userId={98006} following={2} />
        <FollowButton userId={98006} following={3} />
        <FollowButton userId={98006} following={4} />
      </Box>
    </Flex>
  );
}
