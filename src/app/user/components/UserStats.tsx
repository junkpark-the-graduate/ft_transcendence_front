import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { userDummyData } from "./Dashboard";
import { GoTrophy } from "react-icons/go";

export default function UserStats() {
  const winRate: number = Math.floor(
    (userDummyData.stats.wins /
      (userDummyData.stats.wins + userDummyData.stats.losses)) *
      100
  );

  return (
    <Box flex={2} bg="#414147" px={5} pt={3} pb={5} borderRadius={8} mr={3}>
      <BaseHeading text="Stats" size="md" />
      <Divider mt={3} mb={5} />
      <Stack spacing={2}>
        <Flex direction={"row"}>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="red" mb={3}>
                ranking
              </Badge>
              <Icon boxSize="60px" as={GoTrophy} mb={3} />
              <Text fontSize={30}>3rd</Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="orange" mb={3}>
                total game
              </Badge>
              <CircularProgress
                size="60px"
                value={winRate}
                color="orange"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>{winRate} %</CircularProgressLabel>
              </CircularProgress>
              <Text>wins: {userDummyData.stats.wins}</Text>
              <Text>losses: {userDummyData.stats.losses}</Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3}>
                1v1 game
              </Badge>
              <CircularProgress
                size="60px"
                value={winRate}
                color="teal"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>{winRate} %</CircularProgressLabel>
              </CircularProgress>
              <Text>wins: {userDummyData.stats.wins}</Text>
              <Text>losses: {userDummyData.stats.losses}</Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3}>
                ladder game
              </Badge>
              <CircularProgress
                size="60px"
                value={winRate}
                color="teal"
                thickness="12px"
                mb={3}
              >
                <CircularProgressLabel>{winRate} %</CircularProgressLabel>
              </CircularProgress>
              <Text>wins: {userDummyData.stats.wins}</Text>
              <Text>losses: {userDummyData.stats.losses}</Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
