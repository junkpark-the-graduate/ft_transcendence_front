"use client";

import GridType1 from "@/ui/Grid/GridType1";
import FriendList from "../user/components/FriendList";

export default function MainPage() {
  return (
    <GridType1
      children1={<div>game description</div>}
      children2={<FriendList />}
    />
  );
}
