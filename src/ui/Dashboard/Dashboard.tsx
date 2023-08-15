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
import UserDetail from "./UserDetail";
import Custom404 from "@/app/[...not_found]/page";

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
  const [user, setUser] = useState<UserData | null>(null);
  const [matchHistory, setMatchHistory] = useState<Array<MatchHistory>>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    fetchAsyncToBackEnd("/user/" + (userId ?? "")).then((res) => {
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      res.json().then((data) => {
        setUser(data);
      });
    });
    if (userId) {
      fetchAsyncToBackEnd(`/game/by-ftid/${userId}?limit=10&offset=0`).then(
        (res) => {
          if (res.status !== 200) {
            setNotFound(true);
            return;
          }
          res.json().then((matchHistory: Array<MatchHistory>) => {
            setMatchHistory(matchHistory);
          });
        }
      );
    }
  }, []);
  useEffect(() => {
    if (!userId && user) {
      fetchAsyncToBackEnd(`/game/by-ftid/${user.id}?limit=10&offset=0`).then(
        (res) => {
          if (res.status !== 200) {
            setNotFound(true);
            return;
          }
          res.json().then((matchHistory: Array<MatchHistory>) => {
            setMatchHistory(matchHistory);
          });
        }
      );
    }
  }, [user]);

  return (
    <>
      {notFound ? (
        <Custom404 />
      ) : user ? (
        <Flex p={4} direction="column">
          <Divider borderColor="#A0A0A3" mt={2} mb={4} />
          {userId ? (
            <UserDetail userData={user} />
          ) : (
            <MyDetail userData={user} />
          )}
          <Divider borderColor="#A0A0A3" my={6} />
          <Box flex={5}>
            <Flex>
              <UserRank id={user.id} />
              <UserScore userData={user} />
              <UserStats id={user.id} />
            </Flex>
            <UserMatchHistory id={user.id} matchHistory={matchHistory} />
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
