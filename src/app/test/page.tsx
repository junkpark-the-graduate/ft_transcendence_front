"use client";

import BaseTabs from "@/ui/Tab/Tab";
import FriendList from "../user/components/FriendList";

export default function Test() {
  return (
    <BaseTabs children1={<div>hello</div>} children2={<FriendList />}>
      <div>Content 1</div>
      <div>Content 2</div>
    </BaseTabs>
  );
}
