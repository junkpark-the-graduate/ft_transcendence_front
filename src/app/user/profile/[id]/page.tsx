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
import UserStats from "../../components/UserStats";
import UserAchievement from "../../components/UserAchievement";
import UserMatchHistory from "../../components/UserMatchHistory";
import GridType1 from "@/ui/Grid/GridType1";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import BlockButton from "@/ui/Button/BlockButton";
import { useState } from "react";

export default function UserProfile({ params }: { params: any }) {
  const myId: number | undefined = getMyData()?.id;
  const userId = myId ? myId : 0; // 변환: number | undefined -> number
  const userData = getUserData(params.id);

  // FollowButton과 BlockButton의 상태를 UserProfile 컴포넌트에서 관리
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  // FollowButton에서 상태 업데이트시 호출되는 함수
  const handleFollowChange = (newValue: boolean) => {
    setIsFollowing(newValue);
  };

  // BlockButton에서 상태 업데이트시 호출되는 함수
  const handleBlockChange = (newValue: boolean) => {
    setIsBlocking(newValue);
  };

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

  return (
    <GridType1
      children={
        <Flex p={4} direction="column">
          {UserDetail}
          <Divider my={6} />
          <Box flex={7}>
            <Flex>
              <UserStats />
              <UserAchievement />
            </Flex>
            <UserMatchHistory />
          </Box>
        </Flex>
      }
    />
  );
}
