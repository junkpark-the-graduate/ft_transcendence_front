"use client";

import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Badge,
  Divider,
} from "@chakra-ui/react";

const userData = {
  stats: {
    wins: 10,
    losses: 5,
    ladderLevel: 7,
    achievements: ["First Place", "Master of the Game"],
  },
  matchHistory: [
    { id: 1, type: "1v1", result: "win" },
    { id: 2, type: "1v1", result: "loss" },
    { id: 3, type: "ladder", result: "win" },
  ],
};

export default function UserHistory() {
  return (
    <Box flex={3}>
      <Heading size="md" mb={2}>
        Stats
      </Heading>
      <Stack ml={3} spacing={2}>
        <Text>Wins: {userData.stats.wins}</Text>
        <Text>Losses: {userData.stats.losses}</Text>
        <Text>Ladder Level: {userData.stats.ladderLevel}</Text>
        <Heading mt={2} size="sm">
          Achievements
        </Heading>
        <Stack spacing={2}>
          {userData.stats.achievements.map((achievement) => (
            <Flex key={achievement}>
              <Badge key={achievement}>{achievement}</Badge>
            </Flex>
          ))}
        </Stack>
      </Stack>
      <Divider my={4} />
      <Heading size="md" mb={2}>
        Match History
      </Heading>
      <Stack ml={3} spacing={2}>
        {userData.matchHistory.map((match) => (
          <Flex key={match.id} align="center">
            <Text>{match.type}: </Text>
            <Badge
              colorScheme={match.result === "win" ? "green" : "red"}
              ml={2}
            >
              {match.result}
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
