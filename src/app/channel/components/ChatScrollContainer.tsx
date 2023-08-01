"use client";

import React, { useEffect, useRef, useState } from "react";

interface ChatScrollContainerProps {
  children: React.ReactNode;
}

const ChatScrollContainer: React.FC<ChatScrollContainerProps> = ({
  children,
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
      if (outerDiv.current === null) return;
      outerDiv.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={outerDiv}
      style={{
        position: "relative",
        height: "80%",
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  );
};

export default ChatScrollContainer;
