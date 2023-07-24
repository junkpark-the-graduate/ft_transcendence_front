import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { userDummyData } from "./Dashboard";

export default function UserStats() {
  const winRate: number = Math.floor(
    (userDummyData.stats.wins /
      (userDummyData.stats.wins + userDummyData.stats.losses)) *
      100
  );

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
              <Badge colorScheme="orange" mb={3} fontSize="12px">
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
              <Text fontSize={14}>
                {userDummyData.stats.wins} W / {userDummyData.stats.losses} L
              </Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3} fontSize="12px">
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
              <Text fontSize={14}>
                {userDummyData.stats.wins} W / {userDummyData.stats.losses} L
              </Text>
            </Flex>
          </Box>
          <Box flex={1}>
            <Flex direction="column" alignItems="center">
              <Badge colorScheme="teal" mb={3} fontSize="12px">
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
              <Text fontSize={14}>
                {userDummyData.stats.wins} W / {userDummyData.stats.losses} L
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
