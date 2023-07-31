"use client";

import { HStack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";
import GameUserCard from "./components/GameUserCard";
import GameSettingCard from "./components/GameSettingCard";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export default function Page({
  searchParams,
}: {
  searchParams: {
    roomId?: string;
  };
}) {
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  //const [matchingTime, setmatchingTime] = useState("00:00");

  const router = useRouter();

  socket.on("match_found", (data: any) => {
    const { roomId, opponent } = data;

    setOpponent(opponent);
    setIsMatched(true);
    setTimeout(() => {
      router.push(`/game/join?roomId=${roomId}`);
    }, 3000);
  });

  socket.on("disconnect", () => {
    console.log("disconnected from server");
    router.push(`/`);
  });

  useEffect(() => {
    socket.emit("reconnect", (data: any) => {
      const { roomId } = data;
      if (roomId) router.push(`/game/join?roomId=${roomId}`);
    });
    if (searchParams.roomId) {
      console.log("searchParams.roomId", searchParams.roomId);
      socket.emit("join_room", searchParams.roomId, (data: any) => {
        console.log(data);
      });
    }
    fetchAsyncToBackEnd("/user").then((res) => {
      res.json().then((data) => {
        setUser(data);
      });
    });
  }, []);
  return (
    <GridType2>
      <HStack spacing={"20"} w="100%" h="100%">
        {/* TODO 내 ftId 받아오기 */}
        {user ? (
          <GameUserCard user={user} />
        ) : (
          <Skeleton w={"100%"} h={"100%"} />
        )}

        {isMatching ? (
          isMatched ? (
            // TODO 상대방 ftId 받아오기
            <GameUserCard user={opponent} />
          ) : (
            <Skeleton w={"100%"} h={"100%"} />
          )
        ) : (
          <GameSettingCard setIsMatching={setIsMatching} />
        )}
      </HStack>
    </GridType2>
  );
}
