import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import { useEffect, useState } from "react";
import BaseTabs from "./Tab";
import FollowingList from "../Lists/FollowingList";
import JoinedChannelList from "../Lists/JoinedChannelList";

export default function TabType1() {
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  useEffect(() => {
    getJoinedChannels(setJoinedChannels);
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
