"use client";

import React, { useEffect, useState } from "react";
import ChannelList from "../../../ui/Lists/ChannelList";
import JoinedChannelList from "../../../ui/Lists/JoinedChannelList";
import { getChannels } from "@/utils/channel/getChannels";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";

const Channel: React.FC = () => {
  const [channels, setChannels] = useState<any>([]);
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  useEffect(() => {
    getChannels(setChannels);
    getJoinedChannels(setJoinedChannels);
  }, []);

  // const handleCreateChannel = (newChannel: any) => {
  //   setChannels([...channels, newChannel]);
  // };

  return (
    <>
      <GridType1
        children={<ChannelList channels={channels} setChannels={setChannels} />}
        side={
          <Box px={1}>
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
    </>
  );
};

export default Channel;
