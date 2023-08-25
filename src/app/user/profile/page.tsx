"use client";

import Dashboard from "../../../ui/Dashboard/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";
import TabType1 from "@/ui/Tab/TabType1";

export default function MyProfile() {
  return (
    <GridType1 children={<Dashboard userId={null} />} side={<TabType1 />} />
  );
}
