"use client";

import React from "react";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  channels: any[];
}

const ChannelList: React.FC<Props> = ({ channels }) => {
  const router = useRouter();
  const toast = useToast();

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
    return res;
  }

  async function onClickChannel(channelId: number) {
    const res = await joinChannel(channelId);

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else if (res.status == 401) {
      toast({
        title: "You are banned member at this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "You cannot enter this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function goToAdminPage(e: React.MouseEvent, channelId: number) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    //TODO : 관리자 아니면 못들어가게 막음
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
