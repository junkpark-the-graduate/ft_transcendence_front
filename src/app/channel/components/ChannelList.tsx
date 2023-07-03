"use client";

import React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";

interface Props {
  channels: any[];
}

const ChannelList: React.FC<Props> = ({ channels }) => {
  if (!Array.isArray(channels)) {
    // Render a loading indicator or some fallback UI...
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={5}>
      {channels.map((channel: any) => (
        <Box
          key={channel.id}
          padding={3}
          shadow="md"
          borderWidth={1}
          borderRadius="md"
        >
          <Text fontSize="xl">{channel.name}</Text>
          <Text fontSize="sm">Owner ID: {channel.ownerId}</Text>
          <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export default ChannelList;
