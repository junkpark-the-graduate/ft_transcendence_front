"use client";

import ChatRoom from "../../../components/ChatRoom";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";
import ChannelConnectedMemberList from "@/app/(chat)/components/ChannelConnectedMemberList";
import Cookies from "js-cookie";
import { getChannels } from "@/utils/channel/getChannels";

export default function Page({ params }: { params: { channelId: number } }) {
  const [connnectedMembers, setConnectedMembers] = useState<any>([]);
  const [channel, setChannel] = useState<any>([]);
  const accessToken = Cookies.get("accessToken");

  const getChannel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}`,
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
  };

  useEffect(() => {
    getChannel().then((res) => {
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
