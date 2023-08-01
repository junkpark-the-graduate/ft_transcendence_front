"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  Avatar,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PasswordModal from "@/ui/Modal/PasswordModal";
import Input from "@/ui/Input/Input";
import ButtonBox from "@/ui/Box/ButtonBox";
import CreateChannelModal from "@/ui/Modal/CreateChannelModal";

interface Props {
  channels: any[];
  setChannels: any;
}

const ChannelList: React.FC<Props> = ({ channels, setChannels }) => {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  if (!Array.isArray(channels)) {
    return <div>Loading...</div>;
  }

  async function joinChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res;
  }

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

  async function handleJoinChannel(channelId: number) {
    const res = await joinChannel(channelId);
    const resJson = await res.json();

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function isAlreadyJoinedChannel(channelId: number) {
    const res = await connectJoinedChannel(channelId);
    if (res.status < 300) return true;
    else return false;
  }

  function goToAdminPage(e: React.MouseEvent, channelId: number) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    //TODO : 관리자 아니면 못들어가게 막음
    router.push(`/channel/${channelId}/admin`); // Change this path to your admin page's path
  }

  async function onClickChannel(channelId: number) {
    // "channels" 배열에서 해당 channelId에 맞는 채널을 찾습니다.
    const channel = channels.find((c) => c.id === channelId);
    setSelectedChannelId(channelId);

    if (channel) {
      if (channel.type === EChannelType.protected) {
        if (await isAlreadyJoinedChannel(channelId)) {
          router.push(`/channel/${channelId}/chat`);
        } else setIsOpen(true);
      } else {
        handleJoinChannel(channelId);
      }
    }
  }

  // 검색어 입력 시 호출되는 이벤트 핸들러
  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchKeyword(event.target.value);
  // };

  // // 검색어를 기준으로 채널을 필터링하는 함수
  // const filterChannelsBySearchKeyword = (channel: any) => {
  //   if (channel.name && searchKeyword) {
  //     return channel.name.toLowerCase().includes(searchKeyword.toLowerCase());
  //   }
  //   return false;
  // };

  // // 검색 결과를 보여주는 채널 리스트
  // const filteredChannels = channels.filter(filterChannelsBySearchKeyword);

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
            <CreateChannelModal channels={channels} setChannels={setChannels} />
          </Flex>
        </Box>
        <Flex direction="column" gap={3}>
          {/* {filteredChannels.map((channel: any) => ( */}
          {channels.map((channel: any) => (
            <ButtonBox
              key={channel.id}
              onClick={() => onClickChannel(channel.id)}
              textAlign={"left"}
              position={"relative"} // Add relative positioning so we can use absolute positioning on child
            >
              <Flex direction="row" gap={5} alignItems="center">
                <Avatar size="sm" name={channel.name} />
                <Text fontSize="lg">{channel.name}</Text>
                <Box marginLeft="auto">
                  <HStack spacing={3}>
                    <Badge fontSize="sm">{EChannelType[channel.type]}</Badge>
                    <Text fontSize="sm">{channel.createdAt}</Text>
                  </HStack>
                </Box>
              </Flex>
            </ButtonBox>
          ))}
        </Flex>
      </Box>
      <PasswordModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        channelId={selectedChannelId}
      />
    </>
  );
};

export default ChannelList;
