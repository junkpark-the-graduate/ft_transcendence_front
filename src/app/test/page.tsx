"use client";

import { Box } from "@chakra-ui/react";
import { useUserDataContext } from "@/context/UserDataContext";
import { useRelationContext } from "@/context/RelationContext";

export default function page() {
  const { myData, isLoading } = useUserDataContext();
  const { followingList } = useRelationContext();

  return (
    <Box>
      {myData?.name}
      {followingList}
    </Box>
  );
}
