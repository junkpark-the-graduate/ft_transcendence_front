"use client";

import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

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

  function goToAdminPage(e: React.MouseEvent, channelId: number) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    router.push(`/channel/${channelId}/info`); // Change this path to your admin page's path
  }

  return (
    <Flex direction="column" gap={5}>
      {channels.map((channel: any) => (
        <Box
          key={channel.id}
          padding={3}
          shadow="md"
          borderWidth={1}
          borderRadius="md"
          onClick={() => onClickChannel(channel.id)}
          textAlign={"left"}
          position={"relative"} // Add relative positioning so we can use absolute positioning on child
        >
          <Button
            onClick={(e) => goToAdminPage(e, channel.id)}
            position={"absolute"} // Set the position to absolute
            top={2} // Adjust these values as needed
            right={2} // Adjust these values as needed
          >
            관리자 페이지
          </Button>
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
