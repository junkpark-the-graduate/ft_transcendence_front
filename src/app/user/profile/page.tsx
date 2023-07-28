"use client";

import Dashboard from "../../../ui/Dashboard/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";
import MyDetail from "../../../ui/Dashboard/MyDetail";

export default function MyProfile() {
  return <GridType1 children={<Dashboard userData={<MyDetail />} />} />;
}
