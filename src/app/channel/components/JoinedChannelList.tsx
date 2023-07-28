"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useToast,
  Divider,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  joinedChannels: any[];
  setJoinedChannels: any;
}

const JoinedChannelList: React.FC<Props> = ({
  joinedChannels,
  setJoinedChannels,
}) => {
  const toast = useToast();
  const router = useRouter();

  if (!Array.isArray(joinedChannels)) {
    return <div>Loading...</div>;
  }

  async function exitChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  async function exitChannelHandler(channelId: number) {
    const res = await exitChannel(channelId);
    const newJoinedChannels = joinedChannels.filter(
      (channel: any) => channel.id !== channelId
    );
    setJoinedChannels(newJoinedChannels);
    if (res.status < 300) {
      toast({
        title: `You exited the channel ${channelId}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function connectJoinedChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/joined/${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res;
  }

  async function connectJoinedChannelHandler(channelId: number) {
    const res = await connectJoinedChannel(channelId);
    const resJson = await res.json();
    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Box px={1}>
      <Text
        align="center"
        fontSize="14px"
        bg="#414147"
        borderRadius="5px"
        py={2}
      >
        Joined Channel List
      </Text>
      <Stack spacing={2} mt={4} px={2}>
        {joinedChannels.map((channel, index) => (
          <React.Fragment key={channel.id}>
            <Flex align="center" my={1}>
              <Box
                as="button"
                key={channel.id}
                textAlign={"left"}
                position={"relative"} // Add relative positioning so we can use absolute positioning on child
                onClick={() => connectJoinedChannelHandler(channel.id)}
              >
                <Flex alignItems="center">
                  <Avatar size="sm" name={channel.name} mr={4} />
                  <Text fontSize="md">{channel.name}</Text>
                  {/* <Text fontSize="sm">ID: {channel.id}</Text>
            <Text fontSize="sm">Owner ID: {channel.ownerId}</Text> */}
                  {/* <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
            <Button size="sm" onClick={() => exitChannelHandler(channel.id)}>
            exit channel
          </Button> */}
                </Flex>
              </Box>
            </Flex>
            {index !== joinedChannels.length && ( // 변경된 부분: 마지막 요소 제외
              <Divider borderColor="#414147" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default JoinedChannelList;
