"use client";

import ChatRoom from "../../../components/ChatRoom";
import JoinedChannelList from "../../../../../ui/Lists/JoinedChannelList";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getChannels } from "@/utils/channel/getChannels";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import { getChannelMembers } from "@/utils/channel/getChannelMembers";
import GridType1 from "@/ui/Grid/GridType1";
import ChannelMemberList from "@/app/(chat)/components/ChannelMemberList";

export default function Page({ params }: { params: { channelId: number } }) {
  const [channels, setChannels] = useState<any>([]);
  const [channelMembers, setChannelMembers] = useState<any>([]);

  useEffect(() => {
    getChannels(setChannels);
    getChannelMembers(params.channelId).then((res) => {
      setChannelMembers(res);
    });
  }, []);

  return (
    <GridType1
      children={
        <ChatRoom
          channelId={params.channelId}
          channelMembers={channelMembers}
          setChannelMembers={setChannelMembers}
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
            Channel Member List
          </Text>
          <Box px={3}>
            <ChannelMemberList channelMembers={channelMembers} />
          </Box>
        </Box>
      }
    />
  );
}
