"use client";

import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import FollowButton from "@/ui/Button/FollowButton";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import BlockButton from "@/ui/Button/BlockButton";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { GoComment } from "react-icons/go";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function UserDetail({ userId }: { userId: number }) {
  const accessToken = Cookies.get("accessToken");
  const myId: number | undefined = getMyData()?.id;
  const userData = getUserData(userId);
  const router = useRouter();
  const toast = useToast();

  const createDm = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/direct?memberId=${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const handleConnectDm = async () => {
    const resCreateDm = await createDm();
    const resCreateDmJson = await resCreateDm.json();

    if (resCreateDm.status < 300) {
      router.push(`/channel/${resCreateDmJson.id}/chat-room`);
    } else {
      toast({
        title: resCreateDmJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
              <FollowButton myId={myId} userId={userId} icon={true} />
              <BaseButton
                my={2}
                size="sm"
                leftIcon={<GoComment />}
                text="message"
                onClick={handleConnectDm}
              />
              <BlockButton myId={myId} userId={userId} icon={true} />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
