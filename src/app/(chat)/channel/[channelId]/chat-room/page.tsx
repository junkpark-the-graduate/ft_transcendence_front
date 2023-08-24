"use client";

import ChatRoom from "../../../components/ChatRoom";
import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";
import ChannelConnectedMemberList from "@/app/(chat)/components/ChannelConnectedMemberList";

export default function Page({ params }: { params: { channelId: number } }) {
  const [connnectedMembers, setConnectedMembers] = useState<any>([]);

  return (
    <GridType1
      children={
        <ChatRoom
          channelId={params.channelId}
          connectedMembers={connnectedMembers}
          setConnectedMembers={setConnectedMembers}
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
            <ChannelConnectedMemberList connectedMembers={connnectedMembers} />
          </Box>
        </Box>
      }
    />
  );
}
