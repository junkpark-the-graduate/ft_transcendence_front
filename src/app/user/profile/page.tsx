"use client";

import BaseTabs from "@/ui/Tab/Tab";
import ChannelList from "@/ui/Lists/ChannelList";
import FriendList from "@/ui/Lists/FriendList";
import Dashboard from "../components/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";

export default function Profile() {
  return (
    <GridType1
      children1={<Dashboard />}
      children2={
        <BaseTabs children1={<ChannelList />} children2={<FriendList />}>
          <div>Content 1</div>
          <div>Content 2</div>
        </BaseTabs>
      }
    />
  );
}
