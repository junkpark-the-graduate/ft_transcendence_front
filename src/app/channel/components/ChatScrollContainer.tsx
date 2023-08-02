"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface ChatScrollContainerProps extends BoxProps {
  children: React.ReactNode;
}

const ChatScrollContainer: React.FC<ChatScrollContainerProps> = ({
  children,
  ...props
}) => {
  const outerDiv = useRef<HTMLDivElement>(document.createElement("div"));
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // start the container at the bottom
  useEffect(() => {
    const outerHeight = outerDiv.current.clientHeight;
    const innerHeight = outerDiv.current.scrollHeight;

    outerDiv.current.scrollTo({
      top: innerHeight - outerHeight,
      left: 0,
    });
  }, []);

  // scroll smoothly on change of children
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

  // Detect when user scrolls up and disable autoScroll
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
