"use client";

import { Flex, Divider, Box, Spinner, Center } from "@chakra-ui/react";
import UserRank from "./Rank";
import UserScore from "./Score";
import UserStats from "./Stats";
import UserMatchHistory from "./MatchHistory";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { useEffect, useState } from "react";
import MyDetail from "./MyDetail";
import { EUserStatus } from "@/app/user/types/EUserStatus";

export interface DashBoardProps {
  userData: React.ReactNode;
}

interface MatchHistory {
  id: number;
  player1Id: number;
  player2Id: number;
  gameType: string;
  gameResult: string;
  createdAt: Date;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  mmr: number;
  image: string;
  twoFactorEnabled: boolean;
  status: EUserStatus.online;
}

export default function Dashboard({ userId }: { userId: number | null }) {
  const [user, setUser] = useState(null);
  const [matchHistory, setMatchHistory] = useState<Array<MatchHistory>>([]);

  useEffect(() => {
    if (!userId) {
      fetchAsyncToBackEnd("/user").then((res) => {
        res.json().then((data) => {
          setUser(data);
        });
      });
    } else {
      fetchAsyncToBackEnd(`/user/${userId}`).then((res) => {
        res.json().then((data) => {
          setUser(data);
        });
      });
      fetchAsyncToBackEnd(`/game/by-ftid/${userId}?limit=10&offset=0`).then(
        (res) => {
          res.json().then((matchHistory: Array<MatchHistory>) => {
            setMatchHistory(matchHistory);
          });
        }
      );
    }
  }, []);
  useEffect(() => {
    if (!userId && user) {
      fetchAsyncToBackEnd(`/game/by-ftid/${user["id"]}?limit=10&offset=0`).then(
        (res) => {
          res.json().then((matchHistory: Array<MatchHistory>) => {
            setMatchHistory(matchHistory);
          });
        }
      );
    }
  }, [user]);

  return (
    <>
      {user ? (
        <Flex p={4} direction="column">
          <MyDetail userData={user} />
          <Divider borderColor="#A0A0A3" my={6} />
          <Box flex={7}>
            <Flex>
              <UserRank id={user["id"]} />
              <UserScore userData={user} />
              <UserStats id={user["id"]} />
            </Flex>
            <UserMatchHistory id={user["id"]} matchHistory={matchHistory} />
          </Box>
        </Flex>
      ) : (
        <Center w="full" h="full" alignItems="center">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
