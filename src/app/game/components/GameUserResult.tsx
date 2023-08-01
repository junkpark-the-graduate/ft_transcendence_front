import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
  Box,
  AspectRatio,
  Text,
  Image,
  Spacer,
  Flex,
  Card,
  CardFooter,
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
    <Card backgroundColor={"#181818"} w={"100%"} h={"100%"} border={"10px"}>
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
        <AspectRatio
          w="70%"
          ratio={1 / 1}
          margin={"30px"}
          borderRadius={"15px"}
        >
          <Image w="100%" h="100%" src={image} borderRadius="full" />
        </AspectRatio>
        <Text fontSize={20} color={"white"} h="15%">
          {name}
        </Text>
        <StatGroup
          border={isWin ? "1px solid blue" : "1px solid red"}
          borderColor={isWin ? "blue.500" : "red.500"}
        >
          {mmrChange === 0 ? (
            ""
          ) : (
            <CardFooter w="100%" position={"absolute"} bottom={"0"}>
              {" "}
              <Stat color="white">
                <StatLabel>MMR</StatLabel>
                <StatNumber>{mmr}</StatNumber>
                <StatHelpText>
                  <StatArrow type={isWin ? "increase" : "decrease"} />
                  {mmrChange}
                </StatHelpText>
              </Stat>
            </CardFooter>
          )}
        </StatGroup>
      </div>
    </Card>
  );
}
