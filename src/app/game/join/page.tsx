"use client";

import { Box, Grid, HStack, Spinner, Text } from "@chakra-ui/react";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";
import GameUserResult from "../components/GameUserResult";

export default function Page({ searchParams }: { searchParams: any }) {
  const { roomId } = searchParams;
  const [isValidRoom, setIsValidRoom] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
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

    socket.once("game_over", (data: any) => {
      const { gameResult } = data;
      setGameResult(gameResult);

      setTimeout(() => {
        router.push(`/game`);
      }, 3000);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <>
      {gameResult ? (
        <GridType1>
          <Text fontSize={20} color={"white"}>
            게임 결과
          </Text>
          <Text fontSize={20} color={"white"}>
            {gameResult.score}
          </Text>
          <Text fontSize={20} color={"white"}>
            {`${gameResult.playTime}s`}
          </Text>
          <HStack w={"100%"} h={"80%"}>
            <GameUserResult user={gameResult.player1} />
            <GameUserResult user={gameResult.player2} />
          </HStack>
        </GridType1>
      ) : (
        <GridType2>{isValidRoom ? <Game /> : <Spinner />}</GridType2>
      )}
    </>
  );
}
