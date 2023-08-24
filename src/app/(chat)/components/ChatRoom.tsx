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
import ChatModal from "@/ui/Modal/ChatModal";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import InviteGameModal from "@/ui/Modal/InviteGameModal";
import { set } from "react-hook-form";

interface IUser {
  id: number;
  image: string;
  name: string;
}

interface IChat {
  message: string;
  isBlocked: boolean;
  user: IUser;
}

interface IChatRoomProps {
  channelId: number;
  connectedMembers: any[];
  setConnectedMembers: React.Dispatch<React.SetStateAction<any[]>>;
  channel: any;
  channelMembers: any[];
}

interface IBlockingUserId {
  blockingId: number;
}

const ChatRoom: React.FC<IChatRoomProps> = ({
  channelId,
  connectedMembers,
  setConnectedMembers,
  channel,
  channelMembers,
}) => {
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const toast = useToast();

  const [socket, setSocket] = useState<Socket | null>(null);

  const [user, setUser] = useState<{ [key: string]: any }>({});

  const [directChannelName, setDirectChannelName] = useState<string>("");
  const [blockingUserIdList, setBlockingUserIdList] = useState<
    IBlockingUserId[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // TODO: 어떤 모달 인지 이름 명확히 하기

  const [newChat, setNewChat] = useState<IChat | null>(null);
  const [message, setMessage] = useState<string>("");
  const [newChatHistory, setNewChatHistory] = useState<IChat[]>([]);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [chatHistoryPage, setChatHistoryPage] = useState<number>(1);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const [inviteGameRoomId, setInviteGameRoomId] = useState<string>("");
  const [isInviteGameModalOpen, setIsInviteGameModalOpen] =
    useState<boolean>(false);
  const [gameHost, setGameHost] = useState<IUser>({
    name: "",
    id: 0,
    image: "",
  });
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  async function getBlockingUserIdList() {
    const res = await fetchAsyncToBackEnd("/block/userid");
    const resJson = await res.json();
    return resJson;
  }

  const getUser = async () => {
    const res = await fetchAsyncToBackEnd("/user");
    return await res.json();
  };

  async function getUserDataById(userId: number) {
    const res = await fetchAsyncToBackEnd(`/user/${userId}`);
    return await res.json();
  }

  function filterBlockingUserMessage(chatList: IChat[]) {
    const filteredChatList = chatList.map((chat) => {
      const isBlocked = blockingUserIdList.some(
        (blockingUser) => blockingUser.blockingId === chat.user.id
      );
      if (isBlocked) chat.isBlocked = true;
      else chat.isBlocked = false;
      return chat;
    });
    return filteredChatList;
  }

  async function goToAdminPageHandler() {
    if (user.id !== channel.ownerId)
      toast({
        title: "You are not the owner of this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    else router.push(`/channel/${channelId}/admin`);
  }

  useEffect(() => {
    if (!accessToken) router.push("/");

    Promise.all([
      getUser().then((res) => {
        setUser(res);
      }),

      getBlockingUserIdList().then((res: any) => {
        setBlockingUserIdList(res);
      }),
    ]).then(() => {
      setIsDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;
    if (EChannelType[Number(channel.type)] !== "direct") return;

    const userids = channel.name.split("-").map((id: string) => Number(id));
    const directChannelUserId = userids.find((id: any) => id !== user.id);
    getUserDataById(directChannelUserId).then((res) => {
      setDirectChannelName(res.name);
    });
  }, [isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;

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

    socketIo.on("member_connected", (data: any) => {
      console.log("member_connected", data.member);
      setConnectedMembers((prev) => [...prev, data.member]);
    });

    socketIo.on("member_disconnected", (data: any) => {
      console.log("member_disconnected", data.userId);
      setConnectedMembers((prev) =>
        prev.filter((member) => member.id !== data.userId)
      );
    });

    socketIo.on("new_chat", (data: IChat) => {
      console.log("new_chat data!!!!!", data);
      console.log("blockingUserIdList", blockingUserIdList);
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
      const route =
        EChannelType[Number(channel.type)] === "direct" ? "/dm" : "/channel";
      router.push(route);
    });

    socketIo.on("muted", () => {
      toast({
        title: "You are muted",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });

    socketIo.on(
      "open_invite_game_modal",
      (data: { roomId: string; user: IUser }) => {
        console.log("open_invite_game_modal", data);
        setInviteGameRoomId(data.roomId);
        setGameHost(data.user);
        setIsInviteGameModalOpen(true);
      }
    );

    socketIo.on("chat_history", (chatHistory: { chatHistory: IChat[] }) => {
      setChatList((prev) => [
        ...filterBlockingUserMessage(chatHistory.chatHistory),
        ...prev,
      ]);
      setNewChatHistory(chatHistory.chatHistory);
    });

    socketIo.emit("get_chat_history", { page: chatHistoryPage });
    setChatHistoryPage((prev) => prev + 1);

    return () => {
      console.log("disconnect!!!!!!!!!!!!!!!!!!");
      socketIo.disconnect();
    };
  }, [isDataLoaded]);

  useEffect(() => {
    if (!socket || !newChatHistory) return;
    setChatList((prev) => [...filterBlockingUserMessage(prev)]);
  }, [socket, newChatHistory]);

  // discription: 채팅 스크롤이 끝에 닿으면 채팅 내역을 가져온다.
  useEffect(() => {
    if (!inView || !socket) return;
    socket.emit("get_chat_history", { page: chatHistoryPage });
    setChatHistoryPage((prev) => prev + 1);
  }, [inView]);

  // discription: 유저가 특정 유저를 차단했을때 해당 유저의 메시지를 차단한다.
  useEffect(() => {
    if (!socket) return;
    setChatList(filterBlockingUserMessage(chatList));
  }, [socket, blockingUserIdList]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("get_connected_members", (data: any) => {
      setConnectedMembers(data.filter((member: any) => member.id !== user.id));
    });
  }, [socket, user]);

  useEffect(() => {
    if (!socket || !inviteGameRoomId) return;
    console.log("inviteGameRoom", inviteGameRoomId);
    socket.emit("invite_game", {
      roomId: inviteGameRoomId,
      memberId: selectedUserId,
      user: user,
    });
  }, [inviteGameRoomId]);

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (message && socket) {
      const chatData = {
        message,
        isBlocked: false,
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
  const selectUserHandler = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
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
              const route =
                EChannelType[Number(channel.type)] === "direct"
                  ? "/dm"
                  : "/channel";
              router.push(route);
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
    <Box w="full" h="full" borderRadius="8px" pb={5}>
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
              pl={4}
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
                  <Box
                    as="button"
                    onClick={() => selectUserHandler(chatItem.user.id)}
                  >
                    <Text fontSize="md" color={"black"}>
                      {chatItem.user.name} :{" "}
                      {chatItem.isBlocked
                        ? "this message is blocked"
                        : chatItem.message}
                    </Text>
                  </Box>
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
      <ChatModal
        channelId={channelId}
        memberId={selectedUserId}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        user={channelMembers?.find((member) => member.user.id === user.id)}
        setBlockingUserIdList={setBlockingUserIdList}
        connectedMembers={connectedMembers}
        setInviteGameRoomId={setInviteGameRoomId}
        channelType={channel.type}
      />
      <InviteGameModal
        isOpen={isInviteGameModalOpen}
        setIsOpen={setIsInviteGameModalOpen}
        gameHost={gameHost}
        roomId={inviteGameRoomId}
      />
    </Box>
  );
};

export default ChatRoom;
