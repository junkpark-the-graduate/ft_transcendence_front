"use client";

import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";
import GameUserResult from "../components/GameUserResult";
import { Title } from "@/ui/Intro/Title";
import TabType1 from "@/ui/Tab/TabType1";
import GameButton from "@/ui/Button/GameButton";
import { GoHome } from "react-icons/go";

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
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return gameResult ? (
    <GridType1 side={<TabType1 />}>
      <Box px={4} py={4} alignItems="center" alignContent="center">
        <Center mt={16}>
          <Flex direction="column">
            <Title />
            <GameButton
              alignSelf="center"
              leftIcon={<GoHome />}
              w="40%"
              text="back to main"
              onClick={() => {
                router.push(`/game`);
              }}
              mt={8}
            />
            <Box
              alignSelf="center"
              mt={8}
              w="100%"
              pb={6}
              border={"white 2px solid"}
              boxShadow={"7px 7px black"}
            >
              <Box position="relative" p={6}>
                <Divider borderColor="#A0A0A3" />
                <AbsoluteCenter bg="#29292D" px={4}>
                  <Text fontSize={20}>Game Result</Text>
                </AbsoluteCenter>
              </Box>
              <Flex mt={1} direction="column" align="center" gap={2}>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  {`Game Type: ${gameResult.gameType}`}
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  {`Winner: ${gameResult.gameWinner}`}
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  Score: {gameResult.score}
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  Play Time: {`${gameResult.playTime / 1000}s`}
                </Text>
              </Flex>
              <Box position="relative" px={8} py={6}>
                <Divider borderColor="#A0A0A3" />
              </Box>
              <Center>
                <HStack gap={10}>
                  <GameUserResult user={gameResult.player1} />
                  <Text fontSize={24}>vs</Text>
                  <GameUserResult user={gameResult.player2} />
                </HStack>
              </Center>
            </Box>
          </Flex>
        </Center>
      </Box>
    </GridType1>
  ) : (
    <GridType2>{isValidRoom ? <Game /> : <Spinner />}</GridType2>
  );
}
