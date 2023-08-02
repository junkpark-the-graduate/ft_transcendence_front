"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GridType3 from "@/ui/Grid/GridType3";
import ChannelList from "@/ui/Lists/ChannelList";
import JoinedChannelList from "@/ui/Lists/JoinedChannelList";
import { getChannels } from "@/utils/channel/getChannels";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";

export default function Page() {
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
    <GridType3
      children={<ChannelList channels={channels} setChannels={setChannels} />}
      children1={
        <JoinedChannelList
          joinedChannels={joinedChannels}
          setJoinedChannels={setJoinedChannels}
        />
      }
    />
  );
}

{
  /* <CreateChannel channels={channels} setChannels={setChannels} /> */
}
