import { Box, Center, Divider, Flex, Grid, GridItem } from "@chakra-ui/react";
import { GameStartButton } from "./GameStartButton";
import GameDesciption from "./GameDescription";
import Ranking from "./Ranking";
import { Title } from "@/ui/Intro/Title";

export default function GameHome() {
  return (
    <Box>
      <Center flexDirection="column" display={{ base: "flex", md: "flex" }}>
        <Box mt={8} mb={10}>
          <Title />
        </Box>
        <GameStartButton />
      </Center>
      <Divider mt={12} mb={6} borderColor="#414147" />
      <Box mx={2}>
        <Grid
          gridTemplateRows={"repeat(1, 1fr)"}
          gridTemplateColumns={"repeat(2, 1fr)"}
          gap={3}
        >
          <GridItem colSpan={1}>
            <GameDesciption />
          </GridItem>
          <GridItem colSpan={1}>
            <Ranking />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
