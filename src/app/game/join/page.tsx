"use client";

import { Box, Spinner } from "@chakra-ui/react";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";

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
    <GridType2>
      {/* <Box backgroundColor={"tomato"} width={"full"} height={"full"}> */}
      {isValidRoom ? <Game /> : <Spinner />}
      {/* </Box> */}
    </GridType2>
  );
}
