"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import PasswordModal from "@/ui/Modal/PasswordModal";
import Input from "@/ui/Input/Input";
import ButtonBox from "@/ui/Box/ButtonBox";
import CreateChannelModal from "@/ui/Modal/CreateChannelModal";
import { formatCreatedAt } from "@/utils/chat/formatCreatedAt";
import ChannelBadge from "../Badges/ChannelBadge";
import { GoSync } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { set } from "react-hook-form";

interface Props {
  setJoinedChannels: any;
  joinedChannels: any;
}

const ChannelList: React.FC<Props> = ({
  setJoinedChannels,
  joinedChannels,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState<string>("");
  const [channels, setChannels] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const [error, setError] = useState<Error | null>(null);
  const [sync, setSync] = useState<boolean>(false);

  if (!Array.isArray(channels)) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw error;
  }

  async function getChannels(
    page: number,
    limit: number,
    searchKeyword: string
  ) {
    try {
      const res = await fetchAsyncToBackEnd(
        `/channel/keyword?page=${page}&limit=${limit}&searchKeyword=${searchKeyword}`
      );
      const resJson = await res.json();
      return resJson;
    } catch (error: any) {
      setError(error);
    }
  }

  const getPaginatedChannels = useCallback(async () => {
    console.log("getPaginatedChannels", page, limit, searchKeyword);
    const res = await getChannels(page, limit, searchKeyword);
    if (!res) return;
    setChannels((prevChannels: any) => [...prevChannels, ...res]);
  }, [page, limit, searchKeyword, sync]);

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
    if (tmpSearchKeyword !== searchKeyword) {
      setPage(1);
      setChannels([]);
    }
    setSearchKeyword(tmpSearchKeyword);
  }

  async function syncChannelsHandler() {
    if (page === 1) setSync(!sync);
    setPage(1);
    setChannels([]);
  }

  async function joinChannel(channelId: number) {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${channelId}/member`, {
        method: "POST",
      });

      return res;
    } catch (error: any) {
      setError(error);
    }
  }

  async function handleJoinChannel(channelId: number) {
    const res = await joinChannel(channelId);
    if (!res) return;

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

  async function connectJoinedChannel(channelId: number) {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/joined/${channelId}`);
      return res;
    } catch (error: any) {
      setError(error);
    }
  }

  async function isAlreadyJoinedChannel(channelId: number) {
    const res = await connectJoinedChannel(channelId);
    if (!res) return false;

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
            joinedChannels={joinedChannels}
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
