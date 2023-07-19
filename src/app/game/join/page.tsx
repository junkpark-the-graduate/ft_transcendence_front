"use client";

import { Spinner } from "@chakra-ui/react";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useRouter } from "next/navigation";

export default function Page({ searchParams }: { searchParams: any }) {
  const { roomId } = searchParams;
  const [isValidRoom, setIsValidRoom] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket.emit("join_room", { roomId }, (data: any) => {
      const { isSuccess } = data;

      if (isSuccess) setIsValidRoom(true);
      else {
        alert("종료되었거나, 유효하지 않은 방입니다.");
        router.push("/game");
      }
    });
  });

  return (
    <div>
      {isValidRoom ? (
        <Game />
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </div>
  );
}
