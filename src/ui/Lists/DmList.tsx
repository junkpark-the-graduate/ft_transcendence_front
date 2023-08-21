"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Text, useToast, Avatar, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ButtonBox from "@/ui/Box/ButtonBox";
import { formatCreatedAt } from "@/utils/chat/formatCreatedAt";
import ChannelBadge from "../Badges/ChannelBadge";

const DmList: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const toast = useToast();
  const [channels, setChannels] = useState<any[]>([]);

  async function getDirectChannels() {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/direct/joined`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    return resJson;
  }

  useEffect(() => {
    if (!accessToken) router.push("/");
    getDirectChannels().then((res) => {
      setChannels(res);
    });
  }, []);

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

  async function onClickChannel(channelId: number) {
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
    <>
      <Box px={6} py={4}>
        <Box mt={2}></Box>
        <Flex direction="column" gap={3}>
          {channels.map((channel: any) => {
            const lastChat = channel?.chats[0];
            const lastMessage = lastChat?.message || "no message";
            return (
              <ButtonBox
                key={channel.id}
                onClick={() => onClickChannel(channel.id)}
                textAlign={"left"}
                position={"relative"}
              >
                <Flex direction="row" gap={5} alignItems="center">
                  <Avatar size="sm" name={channel.name} />
                  <Text fontSize="lg">{channel.name}</Text>
                  <Text fontSize="m" color="gray.500">
                    {lastMessage}
                  </Text>
                  <Box marginLeft="auto">
                    <HStack spacing={3}>
                      <ChannelBadge type={Number(channel.type)} />
                      <Text fontSize="sm">
                        {formatCreatedAt(channel.createdAt)}
                      </Text>
                    </HStack>
                  </Box>
                </Flex>
              </ButtonBox>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default DmList;
