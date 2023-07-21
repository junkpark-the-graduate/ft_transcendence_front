import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/utils/user/getUserData";
import { getMyData } from "@/utils/user/getMyData";
import { follow, unfollow } from "@/utils/user/follow";
import { getBlockingList } from "@/utils/user/getBlockingList";
import BlockButton from "../Button/BlockButton";

function BlockingListItem({ myId, userId }: { myId: number; userId: number }) {
  const userData = getUserData(userId);
  const router = useRouter();
  const status: string = "online";

  return (
    <Flex align="center" my={1}>
      <Avatar size="sm" name={userData?.name} mr={6}>
        <AvatarBadge
          bg={status === "online" ? "green" : "red"}
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
      <Text>{userData?.name}</Text>
      <Spacer />
      <Flex>
        <BlockButton myId={myId} userId={userId} />
      </Flex>
    </Flex>
  );
}

export default function BlockingList() {
  const myData = getMyData();
  const myId = myData?.id ?? 0; // Default to 0 if `id` is undefined or null
  const blockings = getBlockingList(myId);

  return (
    <Box>
      <Stack spacing={2}>
        {blockings &&
          blockings.map((blockings) => (
            <React.Fragment key={blockings}>
              <BlockingListItem myId={myId} userId={Number(blockings)} />
              <Divider borderColor="#414147" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
