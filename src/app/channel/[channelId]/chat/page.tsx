"use client";

import GridType3 from "@/ui/Grid/GridType3";
import Chat from "../../components/Chat";
import JoinedChannelList from "../../components/JoinedChannelList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default async function Page({
  params,
}: {
  params: { channelId: number };
}) {
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

  return (
    <GridType3
      children={<Chat channelId={params.channelId} />}
      children1={
        <JoinedChannelList
          joinedChannels={joinedChannels}
          setJoinedChannels={setJoinedChannels}
        />
      }
    />
  );
}
