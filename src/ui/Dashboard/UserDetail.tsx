"use client";

import { Avatar, Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import FollowButton from "@/ui/Button/FollowButton";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import BlockButton from "@/ui/Button/BlockButton";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { GoComment } from "react-icons/go";

export default function UserDetail({ userId }: { userId: number }) {
  const myId: number | undefined = getMyData()?.id;
  const userData = getUserData(userId);
  const isMyProfile: boolean = myId == userId;

  return (
    <Box position="relative" px={5} pt={4} borderRadius={8} mb={2}>
      <Box>
        <Grid
          gridTemplateRows={"repeat(1, 1fr)"}
          gridTemplateColumns={"repeat(4, 1fr)"}
        >
          <GridItem colSpan={1}>
            <Avatar size="2xl" name={userData?.name} src={userData?.image} />
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={28} mb={2}>
              {userData?.name}
            </Text>
            <Text fontSize={16}>42 ID: {userData?.id}</Text>
            <Text fontSize={16}>email: {userData?.email}</Text>
            <Text fontSize={16}>
              status:{" "}
              {userData?.status === EUserStatus.online ? "online" : "offline"}
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex flexDirection={"column"} pt={3}>
              <FollowButton
                myId={myId}
                userId={userId}
                icon={true}
                isDisabled={isMyProfile ? true : false}
              />
              <BaseButton
                my={2}
                size="sm"
                leftIcon={<GoComment />}
                text="message"
                onClick={() => {}}
                isDisabled={isMyProfile ? true : false}
              />
              <BlockButton
                myId={myId}
                userId={userId}
                icon={true}
                isDisabled={isMyProfile ? true : false}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
