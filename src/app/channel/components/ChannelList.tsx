"use client";

import React, { useState } from "react";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PasswordModal from "@/ui/Modal/PasswordModal";
import Input from "@/ui/Input/Input";

interface Props {
  channels: any[];
}

const ChannelList: React.FC<Props> = ({ channels }) => {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

    console.log(await res.json());
    return res;
  }

  async function onClickChannel(channelId: number) {
    const res = await joinChannel(channelId);

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else if (res.status == 401) {
      toast({
        title: "You are banned member at this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "You cannot enter this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function joinProtectedChannel(password: string, channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member?password=${password}`,
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

  const handleOpenModal = (channelId: number) => {
    setSelectedChannelId(channelId);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleEnterPassword = async (password: string) => {
    const channelId: number = selectedChannelId; // Access the stored selected channel ID
    const enteredPassword = password; // Access the entered password
    const res = await joinProtectedChannel(enteredPassword, channelId);

    const resJson = await res.json();

    if (res.status < 300) {
      setIsOpen(false);
      router.push(`/channel/${channelId}/chat`);
    } else {
      setErrorMessage(resJson.message);
    }
  };

  function goToAdminPage(e: React.MouseEvent, channelId: number) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    //TODO : 관리자 아니면 못들어가게 막음
    router.push(`/channel/${channelId}/admin`); // Change this path to your admin page's path
  }

  function onOpenModal(channelId: number) {
    // "channels" 배열에서 해당 channelId에 맞는 채널을 찾습니다.
    const channel = channels.find((c) => c.id === channelId);

    if (channel) {
      if (channel.type === EChannelType.protected) {
        handleOpenModal(channelId);
      } else {
        onClickChannel(channelId);
      }
    }
  }

  // 검색어 입력 시 호출되는 이벤트 핸들러
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  // 검색어를 기준으로 채널을 필터링하는 함수
  const filterChannelsBySearchKeyword = (channel: any) => {
    return channel.name.toLowerCase().includes(searchKeyword.toLowerCase());
  };

  // 검색 결과를 보여주는 채널 리스트
  const filteredChannels = channels.filter(filterChannelsBySearchKeyword);

  return (
    <>
      <Box>
        <Text fontSize="xl" mt={5}>
          Channel List
        </Text>
        {/* 검색창 추가 */}
        <Box mt={3}>
          <Input
            type="text"
            placeholder="채널 이름 검색"
            value={searchKeyword}
            onChange={handleSearch}
          />
        </Box>
        <Flex direction="column" gap={5}>
          {/* {channels.map((channel: any) => ( */}
          {filteredChannels.map((channel: any) => (
            <Box
              key={channel.id}
              padding={3}
              shadow="md"
              borderWidth={1}
              borderRadius="md"
              // onClick={() => onClickChannel(channel.id)}
              onClick={() => onOpenModal(channel.id)}
              textAlign={"left"}
              position={"relative"} // Add relative positioning so we can use absolute positioning on child
            >
              <Button
                onClick={(e) => goToAdminPage(e, channel.id)}
                position={"absolute"} // Set the position to absolute
                top={2} // Adjust these values as needed
                right={2} // Adjust these values as needed
              >
                관리자 페이지
              </Button>
              <Text fontSize="xl">{channel.name}</Text>
              <Text fontSize="sm">ID: {channel.id}</Text>
              <Text fontSize="sm">Owner ID: {channel.ownerId}</Text>
              <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <PasswordModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onEnter={handleEnterPassword}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default ChannelList;
