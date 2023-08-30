"use client";
import { useEffect, useState } from "react";
import BaseTabs from "./Tab";
import FollowingList from "../Lists/FollowingList";
import JoinedChannelList from "../Lists/JoinedChannelList";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export default function TabType1() {
  const [joinedChannels, setJoinedChannels] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  const getJoinedChannels = async () => {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/joined`);
      return await res.json();
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
    <BaseTabs
      children1={<FollowingList />}
      children2={
        <JoinedChannelList
          joinedChannels={joinedChannels}
          setJoinedChannels={setJoinedChannels}
        />
      }
    >
      <div>Content 1</div>
      <div>Content 2</div>
    </BaseTabs>
  );
}
