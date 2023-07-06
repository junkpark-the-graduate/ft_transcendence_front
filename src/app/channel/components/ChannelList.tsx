"use client";

import React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  channels: any[];
}

const ChannelList: React.FC<Props> = ({ channels }) => {
  const router = useRouter();
  if (!Array.isArray(channels)) {
    return <div>Loading...</div>;
  }

  async function joinChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(await res.json());
  }

  async function onClickChannel(channelId: number) {
    await joinChannel(channelId);
    router.push(`/channel/${channelId}/chat`);
  }

  return (
    <Flex direction="column" gap={5}>
      {channels.map((channel: any) => (
        <Box
          as="button"
          key={channel.id}
          padding={3}
          shadow="md"
          borderWidth={1}
          borderRadius="md"
          onClick={() => onClickChannel(channel.id)}
          textAlign={"left"}
        >
          <Text fontSize="xl">{channel.name}</Text>
          <Text fontSize="sm">ID: {channel.id}</Text>
          <Text fontSize="sm">Owner ID: {channel.ownerId}</Text>
          <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export default ChannelList;
