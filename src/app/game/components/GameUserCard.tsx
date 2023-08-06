"use client";

import {
  Text,
  Divider,
  Flex,
  Box,
  Avatar,
  Center,
  Skeleton,
} from "@chakra-ui/react";

type User = {
  name: string;
  image: string;
  mmr: number;
};

export default function GameUserCard({ user }: { user: User | null }) {
  const userRank = 1;

  return (
    <Box bg="#414147" borderRadius="8px" px={8} py={6}>
      <Center>
        <Flex direction="row" alignItems="center">
          {user ? (
            <Avatar size="2xl" src={user?.image} border={"white 5px solid"} />
          ) : (
            <Skeleton borderRadius="full">
              <Avatar size="2xl" src={"???"} border={"white 5px solid"} />
            </Skeleton>
          )}

          <Flex ml={6} direction="column">
            <Text fontSize={24} color={"white"}>
              {user ? user.name : "???"}
            </Text>
            <Divider borderColor="#A0A0A3" my={2} />
            <Text fontSize={15} color={"white"}>
              rank: {user ? userRank : "???"}
            </Text>
            <Text fontSize={15} color={"white"}>
              score: {user ? user.mmr : "???"}
            </Text>
            <Text fontSize={15} color={"white"}>
              ? W / ? L
            </Text>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}
