"use client";

import ChatRoom from "../../../components/ChatRoom";
import JoinedChannelList from "../../../../../ui/Lists/JoinedChannelList";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getChannels } from "@/utils/channel/getChannels";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import GridType1 from "@/ui/Grid/GridType1";

export default function Page({ params }: { params: { channelId: number } }) {
  const [channels, setChannels] = useState<any>([]);
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  useEffect(() => {
    getChannels(setChannels);
    getJoinedChannels(setJoinedChannels);
  }, []);

  return (
    <GridType1
      children={<ChatRoom channelId={params.channelId} />}
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
            Joined Channel List
          </Text>
          <Box px={3}>
            <JoinedChannelList
              joinedChannels={joinedChannels}
              setJoinedChannels={setJoinedChannels}
            />
          </Box>
        </Box>
      }
    />
  );
}
