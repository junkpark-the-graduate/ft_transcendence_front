"use client";

import { Flex, Divider, Box, Spinner } from "@chakra-ui/react";
import UserRank from "./Rank";
import UserScore from "./Score";
import UserStats from "./Stats";
import UserMatchHistory from "./MatchHistory";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { useEffect, useState } from "react";

export interface DashBoardProps {
  userData: React.ReactNode;
}

export default function Dashboard({ userData }: DashBoardProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAsyncToBackEnd("/user").then((res) => {
      res.json().then((data) => {
        setUser(data);
      });
    });
  }, []);

  return (
    <>
      {user ? (
        <Flex p={4} direction="column">
          {userData}
          <Divider borderColor="#A0A0A3" my={6} />
          <Box flex={7}>
            <Flex>
              <UserRank id={user["id"]} />
              <UserScore id={user["id"]} />
              <UserStats id={user["id"]} />
            </Flex>
            <UserMatchHistory id={user["id"]} />
          </Box>
        </Flex>
      ) : (
        <Spinner size="xl" />
      )}
    </>
  );
}
