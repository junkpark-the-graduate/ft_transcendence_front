"use client";

import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import GameUserResult from "../game/components/GameUserResult";
import { Title } from "@/ui/Intro/Title";
import GridType2 from "@/ui/Grid/GridType2";
import GameButton from "@/ui/Button/GameButton";
import { useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";
import GridType1 from "@/ui/Grid/GridType1";

export default function page() {
  const router = useRouter();
  const gameResult = {
    score: "10 : 7",
    playTime: 100,
    player1: {
      mmr: 1016,
      mmrChange: 10,
      isWin: true,
      image: "https://bit.ly/dan-abramov",
      name: "가나다라",
    },
    player2: {
      mmr: 990,
      mmrChange: 10,
      isWin: false,
      image: "https://bit.ly/dan-abramov",
      name: "마바사",
    },
  };
  return (
    <GridType1 side={<></>}>
      <Box px={4} py={4} alignItems="center" alignContent="center">
        <Center mt={10}>
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
                  Game Type:
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  Winner:
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  Score: {gameResult.score}
                </Text>
                <Text fontSize={16} bg="#171717" px={4} borderRadius={5}>
                  Play Time: {`${gameResult.playTime}s`}
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
  );
}
