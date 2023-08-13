"use client";

import GridType1 from "@/ui/Grid/GridType1";
import Dashboard from "@/ui/Dashboard/Dashboard";
import TabType1 from "@/ui/Tab/TabType1";

export default function UserProfile({ params }: { params: any }) {
  const userId: number = params.id;

  return (
    <GridType1 children={<Dashboard userId={userId} />} side={<TabType1 />} />
  );
}
