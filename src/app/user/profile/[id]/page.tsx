"use client";

import GridType2 from "@/ui/Grid/GridType2";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserHistory from "../../components/UserHistory";
import LinkButton from "@/ui/Button/LinkButton";
import FriendList from "@/ui/Lists/FriendList";
import BaseHeading from "@/ui/Typo/Heading";
import BaseIconButton from "@/ui/Button/IconButton";
import {
  GoCircleSlash,
  GoComment,
  GoNoEntry,
  GoPerson,
  GoPersonAdd,
} from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import FollowButton from "@/ui/Button/FollowButton";
import { getUserData } from "../../components/UserDetail";

interface UserData {
  id: number;
  name: string;
  image: string;
}

function searchUserData(id: number) {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user/${id}`);
      const userData = await res.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (err) {
      console.log("cannot load the user data");
    }
  };
  useEffect(() => {
    fetchUserInfo(id);
  }, []);

  return isLoading ? null : userData;
}

export default function UserProfile({ params }: { params: any }) {
  const myId: number | undefined = getUserData()?.id;
  const userId = myId ? myId : 0; // 변환: number | undefined -> number
  const userData = searchUserData(params.id);

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
