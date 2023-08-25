"use client";

import { Box } from "@chakra-ui/react";
import { useUserDataContext } from "@/context/UserDataContext";

export default function page() {
  const { myData, isLoading } = useUserDataContext();

  return <Box>{isLoading ? "loading..." : myData?.name}</Box>;
}
