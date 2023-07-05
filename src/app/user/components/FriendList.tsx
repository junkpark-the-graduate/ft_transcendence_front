"use client";

import {
  Box,
  Heading,
  Stack,
  Flex,
  Avatar,
  Text,
  Badge,
} from "@chakra-ui/react";

const userData = {
  friends: [
    { id: 2, name: "Jane Smith", status: "online" },
    { id: 3, name: "Mike Johnson", status: "offline" },
  ],
};

export default function FriendList() {
  return (
    <Box>
      <Stack spacing={2}>
        {userData.friends.map((friend) => (
          <Flex key={friend.id} align="center">
            <Avatar size="sm" name={friend.name} mr={2} />
            <Text>{friend.name}</Text>
            <Badge
              colorScheme={friend.status === "online" ? "green" : "red"}
              ml={2}
            >
              {friend.status}
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
