"use client";

import React, { useEffect, useState } from "react";
import ChannelList from "./ChannelList";
import JoinedChannelList from "./JoinedChannelList";
import Cookies from "js-cookie";
import GridType3 from "@/ui/Grid/GridType3";

const Channel: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [channels, setChannels] = useState<any>([]);
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  const getChannels = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setChannels(await res.json());
    } catch (e) {
      console.log(e);
    }
  };

  const getJoinedChannels = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/joined`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const tmp = await res.json();
      setJoinedChannels(tmp);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChannels();
    getJoinedChannels();
  }, []);

  const handleCreateChannel = (newChannel: any) => {
    setChannels([...channels, newChannel]);
  };

  return (
    <>
      <GridType3
        children={<ChannelList channels={channels} setChannels={setChannels} />}
        children1={
          <JoinedChannelList
            joinedChannels={joinedChannels}
            setJoinedChannels={setJoinedChannels}
          />
        }
      />
      {/* <CreateChannel channels={channels} setChannels={setChannels} /> */}
      {/* <ChannelList channels={channels} /> */}
      {/* <JoinedChannelList
        joinedChannels={joinedChannels}
        setJoinedChannels={setJoinedChannels}
      /> */}
    </>
  );
};

export default Channel;
