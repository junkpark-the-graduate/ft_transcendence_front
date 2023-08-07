"use client";

import Dashboard from "../../../ui/Dashboard/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";
import MyDetail from "../../../ui/Dashboard/MyDetail";
import TabType1 from "@/ui/Tab/TabType1";

export default async function MyProfile() {
  return (
    <GridType1
      children={<Dashboard userData={<MyDetail />} />}
      side={<TabType1 />}
    />
  );
}
