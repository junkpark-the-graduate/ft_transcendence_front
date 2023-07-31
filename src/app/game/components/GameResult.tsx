import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
  Box,
} from "@chakra-ui/react";

interface GameResult {
  score: string;
  isWin: boolean;
  mmr: number;
  mmrChange: number;
  playTime: number;
}

export default function GameResult({
  gameResult: { score, isWin, mmr, mmrChange, playTime },
}: {
  gameResult: GameResult;
}) {
  return (
    <Box backgroundColor={"#181818"}>
      <div>
        <Heading
          as="h2"
          size="2xl"
          fontFamily={"inherit"}
          marginBottom={"30%"}
          alignSelf={"center"}
          color={isWin ? "blue.500" : "red.500"}
        >
          {isWin ? "승리!" : "패배"}
        </Heading>
        <StatGroup
          border={isWin ? "1px solid blue" : "1px solid red"}
          borderColor={isWin ? "blue.500" : "red.500"}
        >
          <Stat>
            <StatLabel>점수</StatLabel>
            <StatNumber>{score}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>플레이 시간</StatLabel>
            <StatNumber>{playTime}</StatNumber>
          </Stat>
          {mmrChange === 0 ? (
            ""
          ) : (
            <Stat>
              <StatLabel>MMR</StatLabel>
              <StatNumber>{mmr}</StatNumber>
              <StatHelpText>
                <StatArrow type={isWin ? "increase" : "decrease"} />
                {mmrChange}
              </StatHelpText>
            </Stat>
          )}
        </StatGroup>
      </div>
    </Box>
  );
}
