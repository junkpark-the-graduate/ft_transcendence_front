"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type ChatType = {
  username: string;
  chat: string;
};

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

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
      setChatList((oldChatList) => [...oldChatList, data]);
    });

    socketIo.on("disconnect", () => {
      console.log(`disconnected : ${socketIo.id}`);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [ENDPOINT]);

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (chat && socket) {
      socket.emit("submit_chat", chat);
      setChat("");
    }
  };

  const joinChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && socket) {
      socket.emit("new_user", username);
    }
  };

  return (
    <div>
      <form onSubmit={joinChat}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <Button type="submit">Join Chat</Button>
      </form>

      <form onSubmit={submitChat}>
        <Input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          placeholder="Enter your message"
        />
        <Button type="submit">Send</Button>
      </form>

      {chatList.map((chatItem, index) => (
        <div key={index}>
          <h4>
            {chatItem.username}: {chatItem.chat}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Chat;
