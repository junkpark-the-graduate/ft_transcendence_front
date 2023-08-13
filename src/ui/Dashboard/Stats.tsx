import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { useEffect, useState } from "react";

export interface GameRecord {
  id: number;
  player1Id: number;
  player2Id: number;
  gameType: string;
  gameResult: string;
  createdAt: Date;
}
export interface GameStat {
  totalGame: number;
  winGame: number;
  winRate: number;
}

//async function getGameRecords(
//  id: number,
//  gameType: string,
//  limit: number,
//  offset: number
//): Promise<GameRecord[]> {
//  const res = await fetchAsyncToBackEnd(
//    `/game/by-ftid/${id}?limit=${limit}&offset=${offset}&gameType=${gameType}`
//  );
//  if (!res.ok) {
//    throw new Error("getGameRecords fetch failed");
//  }
//  const records = await res.json();
//  return records;
//}

export default function UserStats({ id }: { id: number }) {
  const defaultGameStat: GameStat = { totalGame: 0, winGame: 0, winRate: 0 };
  const [totalGameStat, setTotalGameStat] = useState<GameStat>(defaultGameStat);
  const [normalGameStat, setNormalGameStat] =
    useState<GameStat>(defaultGameStat);
  const [ladderGameStat, setLadderGameStat] =
    useState<GameStat>(defaultGameStat);

  useEffect(() => {
    fetchAsyncToBackEnd(`/game/by-ftid/${id}?limit=1000&offset=0`).then(
      (res) => {
        res.json().then((totalRecords: GameRecord[]) => {
          const getWinGame = (records: GameRecord[]) => {
            return records.filter((record) => {
              const player: string =
                id === record.player1Id ? "player1" : "player2";
              return record.gameResult === player ? true : false;
            }).length;
          };

          const getGameStat = (records: GameRecord[]) => {
            const totalGame = records.length;
            if (!totalGame) return defaultGameStat;
            const winGame = getWinGame(records);
            const winRate = Math.round((winGame / totalGame) * 100);
            return { totalGame, winGame, winRate };
          };

          setTotalGameStat(getGameStat(totalRecords));
          setNormalGameStat(
            getGameStat(
              totalRecords.filter((record) => record.gameType === "normal")
            )
          );
          setLadderGameStat(
            getGameStat(
              totalRecords.filter((record) => record.gameType === "ladder")
            )
          );
        });
      }
    );
  }, []);

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
              <Badge colorScheme="orange" mb={4} fontSize="12px">
                total game
              </Badge>
              <CircularProgress
                size="60px"
                value={totalGameStat.winRate}
                color="orange"
                thickness="10px"
                mb={3}
              >
                <CircularProgressLabel>
                  {totalGameStat.winRate} %
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontSize={14}>
                {totalGameStat.winGame} W /{" "}
                {totalGameStat.totalGame - totalGameStat.winGame} L
              </Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={4} fontSize="12px">
                normal game
              </Badge>
              <CircularProgress
                size="60px"
                value={normalGameStat.winRate}
                color="teal"
                thickness="10px"
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
              <Badge colorScheme="teal" mb={4} fontSize="12px">
                ladder game
              </Badge>
              <CircularProgress
                size="60px"
                value={ladderGameStat.winRate}
                color="teal"
                thickness="10px"
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
