"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Text, useToast, Avatar, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ButtonBox from "@/ui/Box/ButtonBox";
import { formatCreatedAt } from "@/utils/chat/formatCreatedAt";
import ChannelBadge from "../Badges/ChannelBadge";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

const DmList: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const toast = useToast();
  const [channels, setChannels] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  async function getDirectChannels() {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/direct/joined`);
      const resJson = await res.json();
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  }

  useEffect(() => {
    if (!accessToken) router.push("/");
    getDirectChannels().then((res) => {
      if (!res) return;
      setChannels(res);
    });
  }, []);

  async function connectJoinedChannel(channelId: number) {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/joined/${channelId}`);
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function onClickChannel(channelId: number) {
    const res = await connectJoinedChannel(channelId);
    if (!res) return;

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
            const lastChat = channel?.chats[channel?.chats.length() - 1];
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
