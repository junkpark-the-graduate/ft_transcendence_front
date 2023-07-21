"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import BaseIconButton from "@/ui/Button/IconButton";
import {
  GoCircleSlash,
  GoComment,
  GoKebabHorizontal,
  GoNoEntry,
  GoPerson,
} from "react-icons/go";

// Dummy data for users
const dummyUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
];

export default function Test() {
  const [following, setFollowing] = useState<number[]>([]);

  // Function to handle follow/unfollow
  const handleFollow = (userId: number) => {
    if (following.includes(userId)) {
      setFollowing(following.filter((id) => id !== userId));
    } else {
      setFollowing([...following, userId]);
    }
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Box fontWeight="bold" fontSize="xl" mb={4}>
        User List:
      </Box>
      <List spacing={2}>
        {dummyUsers.map((user) => (
          <ListItem key={user.id}>
            {user.name}
            <Button ml={2} size="sm" onClick={() => handleFollow(user.id)}>
              {following.includes(user.id) ? "Unfollow" : "Follow"}
            </Button>
          </ListItem>
        ))}
      </List>
      <Box mt={8} fontWeight="bold" fontSize="xl" mb={4}>
        Following List:
      </Box>
      <List spacing={2}>
        {dummyUsers.map((user) =>
          following.includes(user.id) ? (
            <Flex>
              <ListItem key={user.id}>
                {user.name}
                <BaseIconButton
                  size="sm"
                  icon={<GoComment />}
                  aria-label="dm"
                  onClick={() => {}}
                />
                <BaseIconButton
                  size="sm"
                  icon={<GoPerson />}
                  aria-label="info"
                  onClick={() => {
                    // router.push(`/user/profile/${userData?.id}`);
                  }}
                />
                <Menu>
                  <MenuButton as="span" rounded={"full"} cursor={"pointer"}>
                    <BaseIconButton
                      size="sm"
                      icon={<GoKebabHorizontal />}
                      aria-label="else"
                    />
                  </MenuButton>
                  <MenuList p="5px 10px" bg="#414147" border={"none"}>
                    <MenuItem
                      icon={<GoNoEntry />}
                      bg="#414147"
                      fontSize="11pt"
                      onClick={() => handleFollow(user.id)}
                      // onClick={() => {}}
                    >
                      unfollow
                    </MenuItem>
                    <MenuItem
                      icon={<GoCircleSlash />}
                      textColor="red"
                      bg="#414147"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      block this user
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ListItem>
            </Flex>
          ) : null
        )}
      </List>
    </Flex>
  );
}
