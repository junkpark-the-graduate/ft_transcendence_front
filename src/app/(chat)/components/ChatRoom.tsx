"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import {
  Button,
  Text,
  Box,
  Flex,
  useToast,
  Divider,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import ChatInput from "@/ui/Input/ChatInput";
import BaseIconButton from "@/ui/Button/IconButton";
import { GoArrowLeft, GoGear, GoPaperAirplane } from "react-icons/go";
import ChannelBadge from "@/ui/Badges/ChannelBadge";
import ChatScrollContainer from "./ChatScrollContainer";
import { EChannelType } from "../channel/types/EChannelType";

type ChatType = {
  socketId: string;
  username: string;
  message: string;
  userId: number;
};

interface ChatProps {
  channelId: number; // 여기서는 channelId라는 이름의 문자열 속성을 예시로 들었습니다.
  channelMembers: any[];
}

const ChatRoom: React.FC<ChatProps> = ({ channelId, channelMembers }) => {
  const [userId, setUserId] = useState<number>(0); // [1
  const [channel, setChannel] = useState<{ [key: string]: any }>({});
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const accessToken = Cookies.get("accessToken"); // get the accessToken from the cookie
  const router = useRouter();
  const toast = useToast();
  const [directChannelName, setDirectChannelName] = useState<string>("");

  async function checkChannelAdmin() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/admin`,
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

  async function goToAdminPageHandler() {
    const res = await checkChannelAdmin();
    const resJson = await res.json();
    if (res.status > 299) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else router.push(`/channel/${channelId}/admin`);
  }

  const getUserInfo = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_POINT}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setUserId(data.id);
    setUsername(data.name);
  };

  async function getChannel() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    setChannel(resJson);
  }

  useEffect(() => {
    if (!accessToken) router.push("/");
    getUserInfo();
    getChannel();
  }, []);

  useEffect(() => {
    setDirectChannelName(() => {
      const member = channelMembers.find((member) => member.user.id !== userId);
      return member?.user.name;
    });
  }, [channelMembers, userId]);

  useEffect(() => {
    if (!accessToken) return;

    const socketIo = io(`${process.env.NEXT_PUBLIC_CHAT_END_POINT}`, {
      query: {
        token: accessToken, // pass the token to the server
        channelId: channelId,
      },
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log(`connected : ${socketIo.id}`);
    });

    socketIo.on("user_connected", (username: string) => {
      console.log(`${username} connected`);
    });

    socketIo.on("new_chat", (data: ChatType) => {
      console.log("new_chat data!!!!!", data);
      setChatList((oldChatList) => [...oldChatList, data]);
    });

    socketIo.on("disconnect", () => {
      console.log(`disconnected : ${socketIo.id}`);
    });

    socketIo.on("kicked", () => {
      console.log("kicked");
      toast({
        title: "You are kicked out from the channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      router.back();
    });

    socketIo.on("muted", () => {
      toast({
        title: "You are muted",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });

    return () => {
      console.log("disconnect!!!!!!!!!!!!!!!!!!");
      socketIo.disconnect();
    };
  }, [channelId, accessToken]);

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (message && socket) {
      const chatData = { username, message, socketId: socket.id, userId };
      socket.emit("submit_chat", chatData);
      setChatList((oldChatList) => [...oldChatList, chatData]);
      setMessage("");
    }
  };

  return (
    <Box w="full" h="full" borderRadius="8px" px={2} py={1}>
      <Box>
        <Flex alignItems="center">
          <BaseIconButton
            size="sm"
            icon={<GoArrowLeft />}
            aria-label="go back"
            onClick={() => {
              router.back();
            }}
          />
          {EChannelType[Number(channel.type)] !== "direct" && (
            <Text ml={1}>{channel.name}</Text>
          )}
          {EChannelType[Number(channel.type)] === "direct" && (
            <Text ml={1}>{directChannelName} 님과의 채팅방</Text>
          )}
          <Spacer />
          {EChannelType[Number(channel.type)] !== "direct" && (
            <BaseIconButton
              mr={2}
              size="sm"
              icon={<GoGear />}
              aria-label="setting"
              onClick={goToAdminPageHandler}
            />
          )}
          <ChannelBadge type={Number(channel.type)} />
        </Flex>
      </Box>
      <Divider mt={2} mb={3} />
      <ChatScrollContainer>
        {chatList.map((chatItem, index) => {
          const isCurrentUser = chatItem.userId === userId;
          return (
            <Stack
              key={index}
              align={isCurrentUser ? "flex-end" : "flex-start"}
            >
              <Box
                key={index}
                maxW="70%"
                backgroundColor={isCurrentUser ? "teal" : "gray.300"}
                borderRadius="md"
                px={4}
                py={2}
                my={1}
                fontSize="14px"
                fontWeight={300}
              >
                {isCurrentUser && (
                  <Text fontSize="md" color={"white"}>
                    {chatItem.message}
                  </Text>
                )}
                {!isCurrentUser && (
                  <Text fontSize="md" color={"black"}>
                    {chatItem.username} : {chatItem.message}
                  </Text>
                )}
              </Box>
            </Stack>
          );
        })}
      </ChatScrollContainer>
      <Box>
        <form onSubmit={submitChat}>
          <Divider my={3} />
          <Flex flexDirection="row">
            <ChatInput
              mr={2}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <Button
              px={6}
              type="submit"
              textColor="white"
              bg="#191919"
              _hover={{
                background: "#191919",
              }}
              _focus={{
                background: "#191919",
              }}
              leftIcon={<GoPaperAirplane />}
            >
              Send
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default ChatRoom;