"use client";

import ChatRoom from "../../../components/ChatRoom";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";
import ChannelConnectedMemberList from "@/app/(chat)/components/ChannelConnectedMemberList";
import Cookies from "js-cookie";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export default function Page({ params }: { params: { channelId: number } }) {
  const [connnectedMembers, setConnectedMembers] = useState<any>([]);
  const [channel, setChannel] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  const getChannel = async () => {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${params.channelId}`);
      return await res.json();
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    getChannel().then((res) => {
      if (!res) return;
      setChannel(res);
    });
  }, []);

  return (
    <GridType1
      children={
        <ChatRoom
          channelId={params.channelId}
          connectedMembers={connnectedMembers}
          setConnectedMembers={setConnectedMembers}
          channel={channel}
          channelMembers={channel.channelMembers}
        />
      }
      side={
        <Box w="full" px={1}>
          <Text
            align="center"
            fontSize="14px"
            bg="#414147"
            borderRadius="5px"
            py={2}
            mb={4}
          >
            Connected Members
          </Text>
          <Box px={3}>
            <ChannelConnectedMemberList
              connectedMembers={connnectedMembers}
              channelMembers={channel.channelMembers}
              ownerId={channel.ownerId}
              channelType={channel.type}
            />
          </Box>
        </Box>
      }
    />
  );
}
