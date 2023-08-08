"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  Avatar,
  HStack,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { EChannelType } from "../../app/(chat)/channel/types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PasswordModal from "@/ui/Modal/PasswordModal";
import Input from "@/ui/Input/Input";
import ButtonBox from "@/ui/Box/ButtonBox";
import CreateChannelModal from "@/ui/Modal/CreateChannelModal";
import { formatCreatedAt } from "@/utils/chat/formatCreatedAt";
import ChannelBadge from "../Badges/ChannelBadge";
import { GoSync } from "react-icons/go";
import { set } from "react-hook-form";
import { getMyData } from "@/utils/user/getMyData";

const DmList: React.FC = () => {
  const myData = getMyData();
  const router = useRouter();
  const toast = useToast();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [channels, setChannels] = useState<any[]>([]);

  async function getDirectChannels() {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/direct/joined`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    setChannels(resJson);
    return resJson;
  }

  useEffect(() => {
    getDirectChannels();
  }, []);

  async function connectJoinedChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/joined/${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  async function onClickChannel(channelId: number) {
    // "channels" 배열에서 해당 channelId에 맞는 채널을 찾습니다.
    const channel = channels.find((c) => c.id === channelId);
    // setSelectedChannelId(channelId);
    const res = await connectJoinedChannel(channelId);
    const resJson = await res.json();

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat-room`);
    } else {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function syncChannelsHandler() {
    getDirectChannels();
  }

  return (
    <>
      <Box px={6} py={4}>
        <Box mt={2}>
          <Flex direction="row" gap={3} alignItems="center" mb={8}>
            <Input
              type="text"
              placeholder="채널 이름 검색"
              value={searchKeyword}
              onChange={() => console.log("검색어 입력")}
            />
            <IconButton
              aria-label="채널 목록 새로고침"
              icon={<GoSync />}
              bg="#414147"
              borderRadius={"8px"}
              textColor="white"
              _hover={{
                background: "#191919",
              }}
              onClick={syncChannelsHandler}
            />
          </Flex>
        </Box>
        <Flex direction="column" gap={3}>
          {channels.map((channel: any) => {
            const directChannelName = channel.channelMembers.find(
              (member: any) => member.user.id !== Number(myData?.id)
            ).user.name;
            return (
              <ButtonBox
                key={channel.id}
                onClick={() => onClickChannel(channel.id)}
                textAlign={"left"}
                position={"relative"}
              >
                <Flex direction="row" gap={5} alignItems="center">
                  <Avatar size="sm" name={directChannelName} />
                  <Text fontSize="lg">{directChannelName}</Text>
                  <Box marginLeft="auto">
                    <HStack spacing={3}>
                      <ChannelBadge type={Number(channel.type)} />
                      <Text fontSize="sm">
                        {formatCreatedAt(channel.createdAt)}
                      </Text>
                    </HStack>
                  </Box>
                </Flex>
              </ButtonBox>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default DmList;
