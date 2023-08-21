"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  Avatar,
  HStack,
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
import { getTokenClient } from "@/utils/auth/getTokenClient";
import { useInView } from "react-intersection-observer";
import { set } from "react-hook-form";

interface Props {
  setJoinedChannels: any;
}

const ChannelList: React.FC<Props> = ({ setJoinedChannels }) => {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState<string>("");
  const [channels, setChannels] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  if (!Array.isArray(channels)) {
    return <div>Loading...</div>;
  }

  async function getChannels(
    page: number,
    limit: number,
    searchKeyword: string
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/keyword?page=${page}&limit=${limit}&searchKeyword=${searchKeyword}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    return resJson;
  }

  const getPaginatedChannels = useCallback(async () => {
    const res = await getChannels(page, limit, searchKeyword);
    setChannels((prevChannels: any) => [...prevChannels, ...res]);
  }, [page, limit, searchKeyword]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  useEffect(() => {
    getPaginatedChannels();
  }, [getPaginatedChannels, searchKeyword]);

  async function searchChannelHandler(e: React.FormEvent) {
    e.preventDefault();
    setChannels([]);
    setPage(1);
    setSearchKeyword(tmpSearchKeyword);
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

  async function isAlreadyJoinedChannel(channelId: number) {
    const res = await connectJoinedChannel(channelId);
    if (res.status < 300) return true;
    else return false;
  }

  async function onClickChannel(channelId: number) {
    // "channels" 배열에서 해당 channelId에 맞는 채널을 찾습니다.
    const channel = channels.find((c: any) => c.id === channelId);
    setSelectedChannelId(channelId);

    if (channel) {
      if (channel.type === EChannelType.protected) {
        if (await isAlreadyJoinedChannel(channelId)) {
          router.push(`/channel/${channelId}/chat-room`);
        } else {
          setIsOpen(true);
        }
      } else {
        handleJoinChannel(channelId);
      }
    }
  }

  async function syncChannelsHandler() {
    setPage(1);
    setChannels([]);
  }

  return (
    <Box>
      <Box mt={2}>
        <Flex direction="row" gap={3} alignItems="center" mb={8}>
          <Box w={"100%"}>
            <form onSubmit={searchChannelHandler}>
              <Input
                type="text"
                placeholder="채널 이름 검색"
                value={tmpSearchKeyword}
                onChange={(e) => setTmpSearchKeyword(e.target.value)}
              />
            </form>
          </Box>
          <CreateChannelModal
            channels={channels}
            setChannels={setChannels}
            setJoinedChannels={setJoinedChannels}
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
      <Box>
        <Flex direction="column" gap={3} overflowY="auto" maxHeight={"75vh"}>
          {channels.map((channel: any) => (
            <ButtonBox
              key={channel.id}
              onClick={() => onClickChannel(channel.id)}
              textAlign={"left"}
              position={"relative"}
            >
              <Flex direction="row" gap={5} alignItems="center">
                <Avatar size="sm" name={channel.name} />
                <Text fontSize="lg">{channel.name}</Text>
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
          ))}
          <div ref={ref}></div>
        </Flex>
      </Box>
      <PasswordModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        channelId={selectedChannelId}
      />
    </Box>
  );
};

export default ChannelList;
