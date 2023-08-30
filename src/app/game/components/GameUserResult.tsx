import BaseHeading from "@/ui/Typo/Heading";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Flex,
  Avatar,
  Center,
} from "@chakra-ui/react";

interface GameResult {
  score: string;
  isWin: boolean;
  mmr: number;
  mmrChange: number;
  playTime: number;
}

export default function GameUserResult({
  user: { isWin, mmr, mmrChange, image, name },
}: {
  user: any;
}) {
  return (
    <Box>
      <Box px={3} py={1} bg="#171717" borderRadius={5}>
        <Center>
          <Flex alignItems="center" gap={4}>
            <BaseHeading
              text={isWin ? "winner" : "loser"}
              size="md"
              color={isWin ? "blue.500" : "red.500"}
            />
            <BaseHeading ml={3} text={name} />
          </Flex>
        </Center>
      </Box>
      <Center>
        <Flex px={2}>
          {mmrChange === 0 ? (
            <Flex>
              <Avatar
                alignSelf="center"
                my={4}
                size="lg"
                src={image}
                border={"white 3px solid"}
              />
            </Flex>
          ) : (
            <Flex>
              <Avatar my={4} size="lg" src={image} border={"white 3px solid"} />
              <StatGroup alignContent="center">
                <Box w="100%" ml={6}>
                  <Stat textAlign="center">
                    <Flex alignItems="baseline" gap={2}>
                      <StatNumber>{mmr}</StatNumber>
                      <StatLabel>pt</StatLabel>
                    </Flex>
                    <StatHelpText>
                      <StatArrow type={isWin ? "increase" : "decrease"} />
                      {mmrChange}
                    </StatHelpText>
                  </Stat>
                </Box>
              </StatGroup>
            </Flex>
          )}
        </Flex>
      </Center>
    </Box>
  );
}
