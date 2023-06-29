"use client";

import GridType1 from "@/ui/Grid/GridType1";
import FriendList from "../user/components/FriendList";
import BaseTabs from "@/ui/Tab/Tab";
import GameHome from "./components/GameHome";

export default function MainPage() {
  return (
    <GridType1
      children1={<GameHome />}
      children2={
        <BaseTabs children1={<div>hello</div>} children2={<FriendList />}>
          <div>Content 1</div>
          <div>Content 2</div>
        </BaseTabs>
      }
    />
  );
}
