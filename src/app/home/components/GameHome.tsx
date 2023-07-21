import { Center, Flex } from "@chakra-ui/react";
import { GameStartButton } from "./GameStartButton";
import GameDesciption from "./GameDescription";
import Ranking from "./Ranking";

export default function GameHome() {
  return (
    <Flex>
      <Center flexDirection="column" display={{ base: "flex", md: "flex" }}>
        {/* <GameStartButton /> */}
        {/* <GameDesciption /> */}
        {/* <Ranking /> */}
      </Center>
    </Flex>
  );
}
