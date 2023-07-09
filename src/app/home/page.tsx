"use client";

import GridType1 from "@/ui/Grid/GridType1";
import BaseTabs from "@/ui/Tab/Tab";
import GameHome from "./components/GameHome";
import FriendList from "@/ui/Lists/FriendList";
import ChannelList from "@/ui/Lists/ChannelList";

export default function MainPage() {
  return (
    <GridType1
      children1={<GameHome />}
      children2={
        <BaseTabs children1={<ChannelList />} children2={<FriendList />}>
          <div>Content 1</div>
          <div>Content 2</div>
        </BaseTabs>
      }
    />
  );
}
