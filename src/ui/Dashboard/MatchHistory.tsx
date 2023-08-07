"use client";

import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { formatCreatedAt } from "@/utils/chat/formatCreatedAt";

export interface MatchHistoryProps {
  id: number | undefined;
}

interface MatchHistory {
  id: number;
  player1Id: number;
  player2Id: number;
  gameType: string;
  gameResult: string;
  createdAt: Date;
}

export default function UserMatchHistory({
  id,
  matchHistory,
}: {
  id: any;
  matchHistory: MatchHistory[];
}) {
  return (
    <>
      {matchHistory ? (
        <Box
          flex={1}
          px={2}
          pb={4}
          bg="#414147"
          borderRadius={8}
          mt={3}
          overflowY="auto"
        >
          <Box
            bg="#414147"
            borderBottom={"#A0A0A3 1px solid"}
            px={2}
            py={2}
            mb={4}
            borderTopRadius={8}
          >
            <BaseHeading text="Match History" />
          </Box>
          <TableContainer px={2}>
            <Table size="sm" variant="striped" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th fontFamily={"DungGeunMo"}>game no.</Th>
                  <Th fontFamily={"DungGeunMo"}>date</Th>
                  <Th fontFamily={"DungGeunMo"}>opponent id</Th>
                  <Th fontFamily={"DungGeunMo"}>game type</Th>
                  <Th fontFamily={"DungGeunMo"}>result</Th>
                </Tr>
              </Thead>
              <Tbody>
                {matchHistory.length === 0 ? (
                  <Tr>
                    <Td colSpan={5}>
                      <Text textAlign="center">no data</Text>
                    </Td>
                  </Tr>
                ) : matchHistory ? (
                  matchHistory.map((match) => {
                    const isPlayer1 = id === match.player1Id ?? match.player2Id;
                    const isWinner =
                      (isPlayer1 && match.gameResult === "player1") ||
                      (!isPlayer1 && match.gameResult === "player2")
                        ? true
                        : false;
                    return (
                      <Tr key={match.id}>
                        <Td>{match.id}</Td>
                        <Td>{formatCreatedAt(match.createdAt.toString())}</Td>
                        <Td>{isPlayer1 ? match.player2Id : match.player1Id}</Td>
                        <Td>{match.gameType}</Td>
                        <Td>
                          <Badge colorScheme={isWinner ? "green" : "red"}>
                            {isWinner ? "win" : "lose"}
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })
                ) : null}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Center w="full" h="full" alignItems="center">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
