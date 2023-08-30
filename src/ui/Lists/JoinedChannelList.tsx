"use client";

import React, { useState } from "react";
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
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

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
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  if (!Array.isArray(joinedChannels)) {
    return <div>Loading...</div>;
  }

  async function connectJoinedChannel(channelId: number) {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/joined/${channelId}`);
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function connectJoinedChannelHandler(channelId: number) {
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
