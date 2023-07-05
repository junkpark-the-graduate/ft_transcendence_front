"use client";

import GridType2 from "@/ui/Grid/GridType2";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FriendList from "../../components/FriendList";
import UserHistory from "../../components/UserHistory";
import LinkButton from "@/ui/Button/LinkButton";

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
  const userData = searchUserData(params.id);

  return (
    <GridType2>
      <Flex p={4} direction="column">
        <Divider my={6} />
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
            <Box position="absolute" bottom={4} right={0}>
              <LinkButton text="Send DM" size="sm" goTo="#" />
              <LinkButton text="Follow" size="sm" goTo="#" />
            </Box>
          </Flex>
        </Box>
        <Divider my={2} />
        <Flex mt={4}>
          <UserHistory />
          <Box flex={2} pl={4} borderLeft="1px solid #E2E8F0">
            <Heading size="md" mb={2}>
              Friend List
            </Heading>
            <FriendList />
          </Box>
        </Flex>
        <Divider my={4} />
      </Flex>
    </GridType2>
  );
}
