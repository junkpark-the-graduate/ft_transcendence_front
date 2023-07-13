"use client";

import GridType2 from "@/ui/Grid/GridType2";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import UserHistory from "../../components/UserHistory";
import FriendList from "@/ui/Lists/FriendList";
import BaseHeading from "@/ui/Typo/Heading";
import { GoCircleSlash, GoComment } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import FollowButton from "@/ui/Button/FollowButton";
import { useMyData } from "@/hooks/useMyData";
import { useUserData } from "@/hooks/useUserData";

export default function UserProfile({ params }: { params: any }) {
  const myId: number | undefined = useMyData()?.id;
  const userId = myId ? myId : 0; // 변환: number | undefined -> number
  const userData = useUserData(params.id);

  return (
    <GridType2>
      <Flex p={4} direction="column">
        <Box position="relative">
          <Flex align="center" mb={4}>
            <Avatar size="xl" name={userData?.name} src={userData?.image} />
            <Box ml={4}>
              <Heading fontFamily={"DungGeunMo"} mb={3} size="lg">
                {userData?.name}
              </Heading>
              <Text>42 ID: {userData?.id}</Text>
              <Text>status: </Text>
            </Box>
            <Spacer />
            <Flex flexDirection={"column"}>
              <FollowButton userId={userId} following={params.id} />
              <BaseButton
                my={2}
                size="sm"
                text="message"
                leftIcon={<GoComment />}
                onClick={() => {}}
              />
              <BaseButton
                size="sm"
                text="block"
                leftIcon={<GoCircleSlash />}
                onClick={() => {}}
              />
            </Flex>
          </Flex>
        </Box>
        <Divider mt={2} mb={6} />
        <Flex>
          <UserHistory />
          <Box flex={2} pl={4} borderLeft="1px solid #E2E8F0">
            <BaseHeading text="Friend List" size="md" mb={2} />
            <FriendList />
          </Box>
        </Flex>
      </Flex>
    </GridType2>
  );
}
