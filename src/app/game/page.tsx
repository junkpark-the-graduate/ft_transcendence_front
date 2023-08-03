"use client";

import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { GoFlame, GoXCircle, GoZap } from "react-icons/go";
import { Title } from "@/ui/Intro/Title";
import GameUserCard from "./components/GameUserCard";
import GameButton from "@/ui/Button/GameButton";
import RankingModal from "./components/RankingModal";
import HowToPlayModal from "./components/HowToPlayModal";
import GameSettingModal from "./components/GameSettingModal";

export default function Page({
  searchParams,
}: {
  searchParams: {
    roomId?: string;
  };
}) {
  const [gameType, setGameType] = useState("normal");
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);

  const router = useRouter();

  const handleStartMatch = () => {
    const gameType = localStorage.getItem("gameType");

    console.log("start match");
    setIsMatching(true);
    gameType === "normal"
      ? socket.emit("normal_matching")
      : socket.emit("ladder_matching");
  };

  socket.on("match_found", (data: any) => {
    const { roomId, opponent } = data;

    console.log(opponent);
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
        console.log("my data: ", data);
        setUser(data);
      });
    });

    return () => {
      socket.emit("cancel_matching");
      socket.removeAllListeners();
    };
  }, []);

  return (
    <GridType1>
      <Box w="full" px={8} py={4} alignItems="center" alignContent="center">
        <Center my={16}>
          <Flex direction="column">
            <Title />
          </Flex>
        </Center>
        <Flex direction="column" align="center" gap={3}>
          {isMatching ? (
            isMatched ? (
              <></>
            ) : (
              <Stack spacing={3}>
                <GameButton
                  text="Cancel Matching"
                  leftIcon={<GoXCircle />}
                  onClick={() => {
                    socket.emit("cancel_matching");
                    setIsMatching(false);
                  }}
                />
              </Stack>
            )
          ) : (
            <Stack spacing={3}>
              <Box position="relative" my={4} alignItems="center">
                <Divider borderColor="#A0A0A3" />
                <AbsoluteCenter bg="#29292D" px={4}>
                  <Text fontSize={20}>play</Text>
                </AbsoluteCenter>
              </Box>
              <GameButton
                text="Normal Game"
                leftIcon={<GoZap />}
                onClick={() => {
                  setGameType("normal");
                  localStorage.setItem("gameType", gameType);
                  handleStartMatch();
                }}
              />
              <GameButton
                text="Ladder Game"
                leftIcon={<GoFlame />}
                onClick={() => {
                  setGameType("ladder");
                  localStorage.setItem("gameType", gameType);
                  handleStartMatch();
                }}
              />
              <Box position="relative" mt={8} mb={4} alignItems="center">
                <Divider borderColor="#A0A0A3" />
                <AbsoluteCenter bg="#29292D" px={4}>
                  <Text fontSize={20}>utils</Text>
                </AbsoluteCenter>
              </Box>
              <GameSettingModal />
              <RankingModal />
              <HowToPlayModal />
            </Stack>
          )}
        </Flex>

        {isMatching ? (
          <Flex direction="column">
            <Divider borderColor="#A0A0A3" mt={16} />
            <Text align="center" fontSize={24} my={6}>
              {gameType} game
            </Text>
            <Center>
              <HStack spacing={10} mb={10}>
                <GameUserCard user={user} />
                <Text fontSize={30}>vs</Text>
                <GameUserCard user={isMatched ? opponent : null} />
              </HStack>
            </Center>
          </Flex>
        ) : (
          <></>
        )}
      </Box>
    </GridType1>
  );
}
