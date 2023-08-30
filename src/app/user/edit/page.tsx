"use client";

import { UserDataContextProvider } from "@/context/UserDataContext";
import Edit from "../components/Edit";
import { RelationContextProvider } from "@/context/RelationContext";
import GridType1 from "@/ui/Grid/GridType1";
import TabType1 from "@/ui/Tab/TabType1";

export default function EditProfile() {
  return <GridType1 children={<Edit />} side={<TabType1 />} />;
}
