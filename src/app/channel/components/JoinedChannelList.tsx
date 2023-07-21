"use client";

import React from "react";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
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

  return (
    <Box>
      <Text fontSize="xl" mt={5}>
        Joined Channel List
      </Text>
      <Flex direction="column" gap={5}>
        {joinedChannels.map((channel: any) => (
          <Box
            key={channel.id}
            padding={3}
            shadow="md"
            borderWidth={1}
            borderRadius="md"
            textAlign={"left"}
            position={"relative"} // Add relative positioning so we can use absolute positioning on child
          >
            <Text fontSize="xl">{channel.name}</Text>
            <Text fontSize="sm">ID: {channel.id}</Text>
            <Text fontSize="sm">Owner ID: {channel.ownerId}</Text>
            <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
            <Button size="sm" onClick={() => exitChannelHandler(channel.id)}>
              exit channel
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default JoinedChannelList;
