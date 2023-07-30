"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import {
  Input,
  Button,
  Text,
  Box,
  Flex,
  useToast,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import BaseInput from "@/ui/Input/Input";
import BaseButton from "@/ui/Button/Button";
import ChatInput from "@/ui/Input/ChatInput";
import BaseIconButton from "@/ui/Button/IconButton";
import {
  GoArrowLeft,
  GoComment,
  GoGear,
  GoPaperAirplane,
} from "react-icons/go";

type ChatType = {
  socketId: string;
  username: string;
  message: string;
  userId: number;
};

interface ChatProps {
  channelId: number; // 여기서는 channelId라는 이름의 문자열 속성을 예시로 들었습니다.
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const [userId, setUserId] = useState<number>(0); // [1
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const accessToken = Cookies.get("accessToken"); // get the accessToken from the cookie
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!accessToken) {
      router.push("/channel");
    }

    const getUserInfo = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      setUserId(data.id);
      setUsername(data.name);
    };

    getUserInfo();
  }, [accessToken]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatList]);

  const ENDPOINT = "ws://localhost:4242/chattings";

  useEffect(() => {
    if (!accessToken) return;

    const socketIo = io(ENDPOINT, {
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
      console.log("data!!!!!", data);
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
      router.push("/channel");
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
  }, [accessToken, channelId]);

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
    <Box w="full" h="full" borderRadius="8px" bg="#414147" px={4} py={2}>
      <Box>
        <Flex alignItems="center">
          <BaseIconButton
            size="sm"
            icon={<GoArrowLeft />}
            aria-label="go back"
          />
          <Text ml={1}>Channel Name</Text>
          <Spacer />
          <BaseIconButton size="sm" icon={<GoGear />} aria-label="setting" />
        </Flex>
      </Box>
      <Divider mt={2} mb={3} />
      <Flex
        flexDirection="column"
        px={2}
        width="100%"
        height="82%"
        overflowY="auto"
        // minHeight="80vh"
        maxHeight="80vh"
      >
        {chatList.map((chatItem, index) => {
          const isCurrentUser = socket?.id === chatItem.socketId;
          return (
            <Box
              key={index}
              alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
              maxW="70%"
              backgroundColor={isCurrentUser ? "teal" : "gray.300"}
              borderRadius="md"
              px={4}
              py={2}
              my={1}
              fontSize="14px"
              fontWeight={300}
              textAlign={isCurrentUser ? "right" : "left"}
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
          );
        })}
        <div ref={messagesEndRef} />
      </Flex>
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

export default Chat;
