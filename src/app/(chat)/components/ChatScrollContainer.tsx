"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface IUser {
  id: number;
  image: string;
  name: string;
}

interface IChat {
  message: string;
  user: IUser;
}

interface ChatScrollContainerProps extends BoxProps {
  children: React.ReactNode;
  newChat: IChat | null;
  newChatHistory: IChat[];
}

const ChatScrollContainer: React.FC<ChatScrollContainerProps> = ({
  children,
  newChat,
  newChatHistory,
  ...props
}) => {
  const outerDiv = useRef<HTMLDivElement>(document.createElement("div"));
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const previousScrollHeight = useRef<number>(0);
  const previousScrollTop = useRef<number>(0);
  const [loadingCount, setLoadingCount] = useState<number>(0);
  const [prevChildrenLength, setPrevChildrenLength] = useState(
    React.Children.count(children)
  );

  useEffect(() => {
    if (autoScroll) {
      const outerHeight = outerDiv.current.clientHeight;
      const innerHeight = outerDiv.current.scrollHeight;

      outerDiv.current.scrollTo({
        top: innerHeight - outerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [children, autoScroll]);

  useEffect(() => {
    const handleScroll = () => {
      const outerHeight = outerDiv.current.clientHeight;
      const innerHeight = outerDiv.current.scrollHeight;
      const scrollTop = outerDiv.current.scrollTop;

      if (scrollTop < innerHeight - outerHeight) {
        setAutoScroll(false);
      } else {
        setAutoScroll(true);
      }
    };

    outerDiv.current.addEventListener("scroll", handleScroll);

    return () => {
      if (outerDiv.current !== null) {
        outerDiv.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const currentChildrenLength = React.Children.count(children);

    if (currentChildrenLength !== prevChildrenLength) {
      console.log("loadingCount", loadingCount);

      // 로딩 초기
      if (loadingCount < 2) {
        outerDiv.current.scrollTop = outerDiv.current.scrollHeight;
      }
      // 새로운 채팅 기록이 없을 때
      else if (newChatHistory.length == 0) {
        const diff =
          outerDiv.current.scrollHeight - previousScrollHeight.current;
        outerDiv.current.scrollTop = previousScrollTop.current + diff;
      }
      // 새로운 채팅 기록이 있을 때
      else {
        outerDiv.current.scrollTop = 200;
      }

      setLoadingCount((prev) => prev + 1);
    }

    setPrevChildrenLength(currentChildrenLength);
  }, [newChatHistory]);

  useEffect(() => {
    if (newChat !== null) {
      outerDiv.current.scrollTop = outerDiv.current.scrollHeight;
    }
  }, [newChat]);

  return (
    <Box
      ref={outerDiv}
      position="relative"
      height="85%"
      pr={5}
      overflowY="scroll"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ChatScrollContainer;
