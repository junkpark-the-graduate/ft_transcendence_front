import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { useEffect, useState } from "react";

export interface StatsProps {
  id: number | undefined;
}

interface GameRecord {
  id: number;
  player1Id: number;
  player2Id: number;
  gameType: string;
  gameResult: string;
  createdAt: Date;
}

interface GameStat {
  totalGame: number;
  winGame: number;
  winRate: number;
}

export default function UserStats({ id }: StatsProps) {
  const defaultGameStat: GameStat = { totalGame: 0, winGame: 0, winRate: 0 };
  const [normalGameStat, setNormalGameStat] =
    useState<GameStat>(defaultGameStat);
  const [ladderGameStat, setLadderGameStat] =
    useState<GameStat>(defaultGameStat);
  const [totalWinRate, setTotalWinRate] = useState(0);

  useEffect(() => {
    const getGameStat = async (gameType: string, setState: any) => {
      fetchAsyncToBackEnd(
        `/game/by-ftid/${id}?limit=10&offset=0&gameType=${gameType}`
      ).then((res) => {
        res.json().then((normalRecords: Array<GameRecord>) => {
          const totalGame: number = normalRecords.length;
          if (totalGame === 0) {
            return;
          }
          const winGame: number = normalRecords.filter((record) => {
            const player: string =
              id === record.player1Id ? "player1" : "player2";
            return record.gameResult === player ? true : false;
          }).length;
          const winRate = Math.floor((winGame / totalGame) * 100);
          setState({ totalGame, winGame, winRate });
        });
      });
    };

    getGameStat("normal", setNormalGameStat);
    getGameStat("ladder", setLadderGameStat);
  }, []);
  useEffect(() => {
    setTotalWinRate(
      Math.round(
        ((normalGameStat.winGame + ladderGameStat.winGame) /
          (normalGameStat.totalGame + ladderGameStat.totalGame)) *
          100
      )
    );
  }, [normalGameStat, ladderGameStat]);

  return (
    <Box flex={3} bg="#414147" px={2} pb={4} borderRadius={8}>
      <Box
        bg="#414147"
        borderBottom={"#A0A0A3 1px solid"}
        px={2}
        py={2}
        mb={4}
        borderTopRadius={8}
      >
        <BaseHeading text="Stats" />
      </Box>
      <Stack spacing={2}>
        <Flex direction={"row"}>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="orange" mb={3} fontSize="12px">
                total game
              </Badge>
              <CircularProgress
                size="60px"
                value={totalWinRate}
                color="orange"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>{totalWinRate} %</CircularProgressLabel>
              </CircularProgress>
              <Text fontSize={14}>
                {normalGameStat.winGame + ladderGameStat.winGame} W /{" "}
                {normalGameStat.totalGame -
                  normalGameStat.winGame +
                  ladderGameStat.totalGame -
                  ladderGameStat.winGame}{" "}
                L
              </Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3} fontSize="12px">
                normal game
              </Badge>
              <CircularProgress
                size="60px"
                value={normalGameStat.winRate}
                color="teal"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>
                  {normalGameStat!.winRate} %
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontSize={14}>
                {normalGameStat.winGame} W /{" "}
                {normalGameStat.totalGame - normalGameStat.winGame} L
              </Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3} fontSize="12px">
                ladder game
              </Badge>
              <CircularProgress
                size="60px"
                value={ladderGameStat.winRate}
                color="teal"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>
                  {ladderGameStat.winRate} %
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontSize={14}>
                {ladderGameStat.winGame} W /{" "}
                {ladderGameStat.totalGame - ladderGameStat.winGame} L
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
