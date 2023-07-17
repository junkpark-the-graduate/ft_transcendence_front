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

const ChannelList = () => {
  const userData = {
    channels: [
      { id: 2, name: "channel #1" },
      { id: 3, name: "channel #2" },
      { id: 4, name: "channel #3" },
    ],
  };

  return (
    <Box>
      <Stack spacing={2}>
        {userData.channels.map((friend, index) => (
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
                    as="span" // 변경된 부분: <span> 요소로 수정
                    rounded="full"
                    cursor="pointer"
                  >
                    <BaseIconButton
                      size="sm"
                      icon={<GoKebabHorizontal />}
                      aria-label="else"
                    />
                  </MenuButton>
                  <MenuList p="5px 10px" bg="#414147" border="none">
                    <MenuItem
                      icon={<GoGear />}
                      bg="#414147"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      channel setting
                    </MenuItem>
                    <MenuItem
                      icon={<GoSignOut />}
                      textColor="red"
                      bg="#414147"
                      fontSize="11pt"
                      onClick={() => {}}
                    >
                      leave the channel
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
            {index !== userData.channels.length && ( // 변경된 부분: 마지막 요소 제외
              <Divider borderColor="#414147" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default ChannelList;
