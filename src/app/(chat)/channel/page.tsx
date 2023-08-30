"use client";

import React, { useEffect, useState } from "react";
import ChannelList from "@/ui/Lists/ChannelList";
import JoinedChannelList from "@/ui/Lists/JoinedChannelList";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export default function Page() {
  const [joinedChannels, setJoinedChannels] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  const getJoinedChannels = async () => {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/joined`);
      const resJson = await res.json();
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    getJoinedChannels().then((res) => {
      if (!res) return;
      setJoinedChannels(res);
    });
  }, []);

  return (
    <GridType1
      children={
        <ChannelList
          setJoinedChannels={setJoinedChannels}
          joinedChannels={joinedChannels}
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
