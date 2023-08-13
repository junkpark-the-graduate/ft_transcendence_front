"use client";

import React, { use, useEffect, useState } from "react";
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
import {
  GoArrowLeft,
  GoGear,
  GoPaperAirplane,
  GoSignOut,
} from "react-icons/go";
import ChannelBadge from "@/ui/Badges/ChannelBadge";
import ChatScrollContainer from "./ChatScrollContainer";
import { EChannelType } from "../channel/types/EChannelType";
import { useInView } from "react-intersection-observer";

interface IUser {
  id: number;
  image: string;
  name: string;
}

interface IChat {
  message: string;
  user: IUser;
}

interface IChatProps {
  channelId: number; // 여기서는 channelId라는 이름의 문자열 속성을 예시로 들었습니다.
  channelMembers: any[];
}

const ChatRoom: React.FC<IChatProps> = ({ channelId, channelMembers }) => {
  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [channel, setChannel] = useState<{ [key: string]: any }>({});
  const [message, setMessage] = useState<string>("");
  const [newChat, setNewChat] = useState<IChat | null>(null);
  const [newChatHistory, setNewChatHistory] = useState<IChat[]>([]);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const accessToken = Cookies.get("accessToken"); // get the accessToken from the cookie
  const router = useRouter();
  const toast = useToast();
  const [directChannelName, setDirectChannelName] = useState<string>("");
  const [chatHistoryPage, setChatHistoryPage] = useState<number>(2);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const [blockingUserList, setBlockingUserList] = useState<any[]>([]);

  async function getBlockingUserList() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/block/userid`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    return resJson;
  }

  function filterBlockingUserMessage(chatList: IChat[]) {
    const filteredChatList = chatList.map((chat) => {
      const isBlocked = blockingUserList.some(
        (blockingUser) => blockingUser.blockingId === chat.user.id
      );
      if (isBlocked) {
        chat.message = "This message is blocked";
      }
      return chat;
    });
    return filteredChatList;
  }

  async function goToAdminPageHandler() {
    if (user.id !== channel.ownerId) {
      toast({
        title: "You are not the owner of this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else router.push(`/channel/${channelId}/admin`);
  }

  const getUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_POINT}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
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
    return resJson;
  }

  async function getUserDataById(userId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    return resJson;
  }

  useEffect(() => {
    if (!accessToken) router.push("/");

    getUser().then((res) => {
      setUser(res);
    });

    getChannel().then((res) => {
      setChannel(res);
    });

    getBlockingUserList().then((res: any) => {
      setBlockingUserList(res);
    });
  }, []);

  useEffect(() => {
    if (!channelMembers || !user) return;
    if (EChannelType[Number(channel.type)] === "direct") {
      const userids = channel.name.split("-").map((id: string) => Number(id));
      const directChannelUserId = userids.find((id: any) => id !== user.id);
      getUserDataById(directChannelUserId).then((res) => {
        setDirectChannelName(res.name);
      });
    }
  }, [channel, user]);

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

    socketIo.on("new_chat", (data: IChat) => {
      console.log("new_chat data!!!!!", data);
      setChatList((prev) => [...prev, ...filterBlockingUserMessage([data])]);
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

    socketIo.on("chat_history", (chatHistory: { chatHistory: IChat[] }) => {
      setNewChatHistory(chatHistory.chatHistory);
      setChatList((prev) => [
        ...filterBlockingUserMessage(chatHistory.chatHistory),
        ...prev,
      ]);
    });

    socketIo.emit("get_chat_history", { page: 1 });

    return () => {
      console.log("disconnect!!!!!!!!!!!!!!!!!!");
      socketIo.disconnect();
    };
  }, [channelId, accessToken, blockingUserList]);

  useEffect(() => {
    if (inView && socket) {
      socket.emit("get_chat_history", { page: chatHistoryPage });
      setChatHistoryPage((prev) => prev + 1);
    }
  }, [inView]);

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (message && socket) {
      const chatData = {
        message,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      };

      socket.emit("submit_chat", chatData);
      setNewChat(chatData);
      setChatList((prev: IChat[]) => [...prev, chatData]);
      setMessage("");
    }
  };

  const exitChannel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  };

  const exitChannelHandler = async () => {
    const confirm = window.confirm("정말로 채널에서 나가시겠습니까?");
    if (!confirm) return;

    const res = await exitChannel();
    const resJson = await res.json();

    if (res.status > 299) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const route =
        EChannelType[Number(channel.type)] === "direct" ? "/dm" : "/channel";
      router.push(route);
    }
  };

  const ChatHeader = () => {
    return (
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
          <ChannelBadge type={Number(channel.type)} ml={2} />
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
          <BaseIconButton
            mr={2}
            size="sm"
            icon={<GoSignOut />}
            aria-label="exitChannel"
            onClick={exitChannelHandler}
          />
        </Flex>
      </Box>
    );
  };

  return (
    <Box w="full" h="full" borderRadius="8px" px={2} py={1}>
      <ChatHeader />
      <Divider mt={2} mb={3} />
      <ChatScrollContainer newChat={newChat} newChatHistory={newChatHistory}>
        <div ref={ref}></div>
        {chatList.map((chatItem, index) => {
          const isCurrentUser = chatItem.user.id === user.id;
          return (
            <Stack
              key={index}
              align={isCurrentUser ? "flex-end" : "flex-start"}
            >
              <Box
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
                    {chatItem.user.name} : {chatItem.message}
                  </Text>
                )}
              </Box>
            </Stack>
          );
        })}
      </ChatScrollContainer>
      <Divider my={3} />
      <form onSubmit={submitChat}>
        <Flex flexDirection="row">
          <ChatInput
            mr={2}
            type="text"
            value={message}
            onChange={(e) => {
              e.preventDefault();
              setMessage(e.target.value);
            }}
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
  );
};

export default ChatRoom;