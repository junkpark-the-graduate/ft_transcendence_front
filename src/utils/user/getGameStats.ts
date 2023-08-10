import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";
import { GameRecord, GameStat } from "@/ui/Dashboard/Stats";
import { set } from "react-hook-form";

export default function getGameStats(userId: number | undefined) {
  const defaultGameStat: GameStat = {
    totalGame: 0,
    winGame: 0,
    winRate: 0,
  };

  const [gameStats, setGameStats] = useState<{
    total: GameStat;
    normal: GameStat;
    ladder: GameStat;
  }>({
    total: defaultGameStat,
    normal: defaultGameStat,
    ladder: defaultGameStat,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getGameStats = async () => {
    if (!userId) return;

    const response = await fetchAsyncToBackEnd(
      `/game/by-ftid/${userId}?limit=1000&offset=0`
    );

    if (response.ok) {
      const gameRecords: GameRecord[] = await response.json();

      setGameStats({
        total: getGameStat(gameRecords),
        normal: getGameStat(
          gameRecords.filter((record) => record.gameType === "normal")
        ),
        ladder: getGameStat(
          gameRecords.filter((record) => record.gameType === "ladder")
        ),
      });

      setIsLoading(false);
    }
  };

  const getWinGame = (records: GameRecord[]) => {
    return records.filter((record) => {
      const { player1Id, gameResult } = record;
      const player: string = userId === player1Id ? "player1" : "player2";
      return gameResult === player;
    }).length;
  };

  const getGameStat = (records: GameRecord[]) => {
    const totalGame = records.length;
    if (totalGame === 0) return defaultGameStat;
    const winGame = getWinGame(records);
    const winRate = Math.round((winGame / totalGame) * 100);
    return { totalGame, winGame, winRate };
  };

  useEffect(() => {
    getGameStats();
  }, [userId]);

  return isLoading ? null : gameStats;
}
