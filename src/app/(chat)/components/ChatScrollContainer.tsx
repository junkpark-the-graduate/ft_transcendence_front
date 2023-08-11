"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { set } from "react-hook-form";

interface ChatScrollContainerProps extends BoxProps {
  children: React.ReactNode;
}

const ChatScrollContainer: React.FC<ChatScrollContainerProps> = ({
  children,
  ...props
}) => {
  const outerDiv = useRef<HTMLDivElement>(document.createElement("div"));
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const previousScrollHeight = useRef<number>(0);
  const previousScrollTop = useRef<number>(0);
  const [loadingCount, setLoadingCount] = useState<number>(0);

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
    if (loadingCount < 11) {
      const diff = outerDiv.current.scrollHeight - previousScrollHeight.current;
      outerDiv.current.scrollTop = previousScrollTop.current + diff;
    } else {
      outerDiv.current.scrollTop = 200;
    }
    setLoadingCount((prev) => prev + 1);
  }, [children]);

  useEffect(() => {
    previousScrollHeight.current = outerDiv.current.scrollHeight;
    previousScrollTop.current = outerDiv.current.scrollTop;
  }, []);

  return (
    <Box
      ref={outerDiv}
      position="relative"
      height="80%"
      pr={5}
      overflowY="scroll"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ChatScrollContainer;
