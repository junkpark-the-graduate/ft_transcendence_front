"use client";

import React, { useEffect, useState } from "react";
import ChannelList from "@/ui/Lists/ChannelList";
import JoinedChannelList from "@/ui/Lists/JoinedChannelList";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";

export default function Page() {
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  useEffect(() => {
    getJoinedChannels(setJoinedChannels);
  }, []);

  return (
    <GridType1
      children={<ChannelList setJoinedChannels={setJoinedChannels} />}
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
