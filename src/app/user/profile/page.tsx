"use client";

import Dashboard from "../components/Dashboard";
import GridType1 from "@/ui/Grid/GridType1";
import MyDetail from "../components/MyDetail";

export default function MyProfile() {
  return <GridType1 children={<Dashboard userData={<MyDetail />} />} />;
}
