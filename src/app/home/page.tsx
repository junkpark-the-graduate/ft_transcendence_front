"use client";

import GridType1 from "@/ui/Grid/GridType1";
import GameHome from "./components/GameHome";

export default function MainPage() {
  return <GridType1 children={<GameHome />} />;
}
