"use client";

import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Input, Button, Text, Box, Flex } from "@chakra-ui/react";

type ChatType = {
  socketId: string;
  username: string;
  message: string;
};

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatList]);

  // const ENDPOINT = "http://localhost:4242/chattings";
  const ENDPOINT = "ws://localhost:4242/chattings";
  // let socketIo: Socket;

  useEffect(() => {
    // socket = io(ENDPOINT);
    const socketIo = io(ENDPOINT);

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

    return () => {
      socketIo.disconnect();
    };
  }, [ENDPOINT]);

  // const submitChat = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (message && socket) {
  //     socket.emit("submit_chat", { username, message });
  //     setMessage("");
  //   }
  // };

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (message && socket) {
      const chatData = { username, message, socketId: socket.id };
      socket.emit("submit_chat", chatData);
      setChatList((oldChatList) => [...oldChatList, chatData]);
      setMessage("");
    }
  };

  // const joinChat = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (username && socket) {
  //     socket.emit("new_user", username);
  //   }
  // };

  return (
    <div>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <Flex
        flexDirection="column"
        width="100%"
        overflowY="auto"
        minHeight="80vh"
        maxHeight="85vh"
      >
        {chatList.map((chatItem, index) => {
          const isCurrentUser = socket?.id === chatItem.socketId;
          return (
            <Box
              key={index}
              alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
              maxW="70%"
              backgroundColor={isCurrentUser ? "teal.500" : "gray.300"}
              borderRadius="md"
              p={3}
              mt={0.5}
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
      <Box position="fixed" bottom="0" width="100%">
        <form onSubmit={submitChat}>
          <Flex flexDirection="row">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <Button type="submit">Send</Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default Chat;
