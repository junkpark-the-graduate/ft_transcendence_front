"use client";

import React from "react";
import DmList from "@/ui/Lists/DmList";
import { Box, Text } from "@chakra-ui/react";
import GridType1 from "@/ui/Grid/GridType1";
import FollowingList from "@/ui/Lists/FollowingList";

export default function Page() {
  return (
    <GridType1
      children={<DmList />}
      side={
        <Box w="full" px={1}>
          <Text
            align="center"
            fontSize="14px"
            bg="#414147"
            borderRadius="5px"
            py={2}
            mb={4}
          >
            Following List
          </Text>
          <Box px={3}>
            <FollowingList />
          </Box>
        </Box>
      }
    />
  );
}
