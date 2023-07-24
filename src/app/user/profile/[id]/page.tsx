"use client";

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GoComment } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import FollowButton from "@/ui/Button/FollowButton";
import GridType1 from "@/ui/Grid/GridType1";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import BlockButton from "@/ui/Button/BlockButton";
import UserRank from "@/ui/Dashboard/UserRank";
import UserScore from "@/ui/Dashboard/UserScore";
import UserStats from "@/ui/Dashboard/UserStats";
import UserMatchHistory from "@/ui/Dashboard/UserMatchHistory";
import Dashboard from "@/ui/Dashboard/Dashboard";

export default function UserProfile({ params }: { params: any }) {
  const myId: number | undefined = getMyData()?.id;
  const userId = myId ? myId : 0; // 변환: number | undefined -> number
  const userData = getUserData(params.id);

  const UserDetail = (
    <Box position="relative" px={5} pt={6} borderRadius={8}>
      <Flex align="center" mb={4}>
        <Avatar size="2xl" name={userData?.name} src={userData?.image} />
        <Box ml={10}>
          <Heading fontFamily={"DungGeunMo"} mb={4} size="lg">
            {userData?.name}
          </Heading>
          <Text fontSize={16}>42 ID: {userData?.id}</Text>
          <Text fontSize={16}>status: </Text>
        </Box>
        <Spacer />
        <Flex
          flexDirection={"column"}
          position={"absolute"}
          right={0}
          bottom={0}
        >
          <FollowButton myId={userId} userId={params.id} />
          <BaseButton
            my={2}
            size="sm"
            text="message"
            leftIcon={<GoComment />}
            onClick={() => {}}
          />
          <BlockButton myId={userId} userId={params.id} />
        </Flex>
      </Flex>
    </Box>
  );

  return <GridType1 children={<Dashboard userData={UserDetail} />} />;
}
