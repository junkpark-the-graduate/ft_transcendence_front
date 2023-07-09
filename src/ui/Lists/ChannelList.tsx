"use client";

import {
  Box,
  Stack,
  Flex,
  Avatar,
  Text,
  Divider,
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
  GoGear,
  GoSignOut,
  GoPeople,
} from "react-icons/go";

const userData = {
  friends: [
    { id: 2, name: "channel #1" },
    { id: 3, name: "channel #2" },
    { id: 4, name: "channel #3" },
  ],
};

export default function ChannelList() {
  return (
    <Box>
      <Stack spacing={2}>
        {userData.friends.map((friend, index) => (
          <React.Fragment key={friend.id}>
            <Flex align="center" my={1}>
              <Avatar size="sm" name={friend.name} mr={4} />
              <Text>{friend.name}</Text>
              <Spacer />
              <Flex>
                <BaseIconButton
                  size="sm"
                  icon={<GoComment />}
                  aria-label="dm"
                />
                <BaseIconButton
                  size="sm"
                  icon={<GoPeople />}
                  aria-label="info"
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
                      icon={<GoGear />}
                      bg="#3B3D41"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      channel setting
                    </MenuItem>
                    <MenuItem
                      icon={<GoSignOut />}
                      textColor="red"
                      bg="#3B3D41"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      leave the channel
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
