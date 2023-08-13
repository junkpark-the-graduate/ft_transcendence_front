import BaseHeading from "@/ui/Typo/Heading";
import getRank from "@/utils/user/getRank";
import { Box, Flex, Text } from "@chakra-ui/react";
import RankingModal from "../Modal/RankingModal";

export interface RankProps {
  id: number | undefined;
}

export default function UserRank({ id }: RankProps) {
  const ranking = getRank();
  const numericId = Number(id);
  const index: number = ranking?.findIndex((obj) => obj.id === numericId) ?? -1;
  const userRank = index !== -1 ? index + 1 : undefined;

  return (
    <Box flex={1} px={2} pb={4} bg="#414147" borderRadius={8} mr={3}>
      <Box
        bg="#414147"
        borderBottom={"#A0A0A3 1px solid"}
        px={2}
        py={2}
        mb={4}
        borderTopRadius={8}
      >
        <BaseHeading text="Ranking" />
      </Box>
      <Flex direction={"row"} mt={12}>
        <Box flex={1}>
          <Flex direction="column" alignItems="center">
            <Flex align="baseline">
              <Text fontSize="24px" px={2} bg="gray" borderRadius="8px">
                {userRank}
              </Text>
              <Text mx={2}>th</Text>
            </Flex>
            <Flex align="baseline">
              <Text textColor="#A0A0A3" fontSize="14px" mt={2} mr={2}>
                in {ranking?.length} players
              </Text>
              <RankingModal mode={false} />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
