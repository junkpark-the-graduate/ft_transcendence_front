"use client";

import { Avatar, Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import FollowButton from "@/ui/Button/FollowButton";
import { getMyData } from "@/utils/user/getMyData";
import BlockButton from "@/ui/Button/BlockButton";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import DmBaseButton from "../Button/DmBaseButton";
import { UserData } from "./Dashboard";

export default function UserDetail({ userData }: { userData: UserData }) {
  const myId: number | undefined = getMyData()?.id;
  const isMyProfile: boolean = myId == userData.id;

  return (
    <Box position="relative" px={5} pt={4} borderRadius={8} mb={2}>
      <Box>
        <Grid
          gridTemplateRows={"repeat(1, 1fr)"}
          gridTemplateColumns={"repeat(4, 1fr)"}
        >
          <GridItem colSpan={1}>
            <Avatar
              size="2xl"
              border="white 5px solid"
              name={userData?.name}
              src={userData?.image}
            />
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
            <Flex flexDirection={"column"} pt={3} gap={2}>
              <FollowButton
                myId={myId}
                userId={userData.id}
                icon={true}
                isDisabled={isMyProfile ? true : false}
              />
              <DmBaseButton
                userId={userData.id}
                icon={true}
                isDisabled={isMyProfile ? true : false}
              />
              <BlockButton
                myId={myId}
                userId={userData.id}
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
