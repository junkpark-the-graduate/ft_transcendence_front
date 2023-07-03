"use client";

import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import CreateChannel from "./CreateChannel";
import ChannelList from "./ChannelList";
import Cookies from "js-cookie";

const Channel: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [channels, setChannels] = useState<any>([]);

  const getChannels = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3001/channel", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChannels().then((channels) => {
      setChannels(channels);
    });
  }, []);

  const handleCreateChannel = (newChannel: any) => {
    setChannels([...channels, newChannel]);
  };

  return (
    <Box padding={5}>
      <Heading marginBottom={5}>Channel</Heading>
      <CreateChannel onCreate={handleCreateChannel} />
      <ChannelList channels={channels} />
    </Box>
  );
};

export default Channel;
