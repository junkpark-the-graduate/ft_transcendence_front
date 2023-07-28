"use client";

import { Flex, Divider, Box } from "@chakra-ui/react";
import UserRank from "./Rank";
import UserScore from "./MmrScore";
import UserStats from "./Stats";
import UserMatchHistory from "./MatchHistory";

export const userDummyData = {
  stats: {
    wins: 11,
    losses: 5,
    ladderLevel: 7,
    achievements: ["First Place", "Master of the Game"],
  },
  matchHistory: [
    {
      id: 1,
      date: "2023/07/23",
      opponentName: "junkpark",
      opponentId: 123,
      type: "1v1",
      result: "win",
    },
    {
      id: 2,
      date: "2023/07/23",
      opponentName: "seunghye",
      opponentId: 456,
      type: "1v1",
      result: "loss",
    },
    {
      id: 3,
      date: "2023/07/22",
      opponentName: "jnam",
      opponentId: 789,
      type: "1v1",
      result: "loss",
    },
    {
      id: 4,
      date: "2023/07/21",
      opponentName: "mher",
      opponentId: 1011,
      type: "ladder",
      result: "win",
    },
  ],
};

export interface DashBoardProps {
  userData: React.ReactNode;
}

export default function Dashboard({ userData }: DashBoardProps) {
  return (
    <Flex p={4} direction="column">
      {userData}
      <Divider borderColor="#A0A0A3" my={6} />
      <Box flex={7}>
        <Flex>
          <UserRank />
          <UserScore />
          <UserStats />
        </Flex>
        <UserMatchHistory />
      </Box>
    </Flex>
  );
}
