"use client";

import Dashboard from "../../../ui/Dashboard/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";
import MyDetail from "../../../ui/Dashboard/MyDetail";
import { getMyData } from "@/utils/user/getMyData";

export default function MyProfile() {
  const myId: number | undefined = getMyData()?.id;

  return (
    <GridType1 children={<Dashboard userData={<MyDetail />} id={myId} />} />
  );
}
