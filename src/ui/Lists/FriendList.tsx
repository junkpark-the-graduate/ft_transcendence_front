"use client";

import {
  Box,
  Stack,
  Flex,
  Avatar,
  Text,
  Divider,
  AvatarBadge,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React from "react";
import BaseIconButton from "../Button/IconButton";
import {
  GoComment,
  GoKebabHorizontal,
  GoCircleSlash,
  GoNoEntry,
  GoPerson,
} from "react-icons/go";

const userData = {
  friends: [
    { id: 2, name: "junkpark", status: "online" },
    { id: 3, name: "mher", status: "offline" },
    { id: 4, name: "seunghye", status: "offline" },
    { id: 5, name: "jnam", status: "online" },
  ],
};

export default function FriendList() {
  return (
    <Box>
      <Stack spacing={2}>
        {userData.friends.map((friend, index) => (
          <React.Fragment key={friend.id}>
            <Flex align="center" my={1}>
              <Avatar size="sm" name={friend.name} mr={4}>
                <AvatarBadge
                  bg={friend.status === "online" ? "green" : "red"}
                  border="2px"
                  borderColor="white"
                  boxSize="1em"
                />
              </Avatar>
              <Text>{friend.name}</Text>
              <Spacer />
              <Flex>
                <BaseIconButton
                  size="sm"
                  icon={<GoPerson />}
                  aria-label="info"
                />
                <BaseIconButton
                  size="sm"
                  icon={<GoComment />}
                  aria-label="dm"
                />
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                  >
                    <BaseIconButton
                      size="sm"
                      icon={<GoKebabHorizontal />}
                      aria-label="else"
                    />
                  </MenuButton>
                  <MenuList p="5px 10px" bg="#3B3D41" border={"none"}>
                    <MenuItem
                      icon={<GoNoEntry />}
                      bg="#3B3D41"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      unfollow
                    </MenuItem>
                    <MenuItem
                      icon={<GoCircleSlash />}
                      textColor="red"
                      bg="#3B3D41"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      block this user
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
            {index !== userData.friends.length && (
              <Divider borderColor="#3B3D41" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
}
