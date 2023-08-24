"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  Divider,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ChannelBadge from "../Badges/ChannelBadge";

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
      router.push(`/channel/${channelId}/chat-room`);
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
    <Box>
      <Stack spacing={2} overflowY={"auto"} maxHeight={"76vh"}>
        {joinedChannels.map((channel, index) => (
          <React.Fragment key={channel.id}>
            <Box
              as="button"
              key={channel.id}
              textAlign={"left"}
              position={"relative"} // Add relative positioning so we can use absolute positioning on child
              onClick={() => connectJoinedChannelHandler(channel.id)}
            >
              <Flex align="center" alignItems="center" my={1}>
                <Avatar size="sm" name={channel.name} mr={4} />
                <Text fontSize="md">{channel.name}</Text>
                <Box marginLeft="auto">
                  <ChannelBadge type={Number(channel.type)} />
                </Box>
              </Flex>
            </Box>
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
