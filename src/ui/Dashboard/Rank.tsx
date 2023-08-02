import BaseHeading from "@/ui/Typo/Heading";
import { getMyData } from "@/utils/user/getMyData";
import getRank from "@/utils/user/getRank";
import getRankById from "@/utils/user/getRankById";
import {
  Box,
  Flex,
  Highlight,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Text,
} from "@chakra-ui/react";

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
      <Stack spacing={2}>
        <Flex direction={"row"}>
          <Box flex={1} pt={2}>
            <Flex direction="column" alignItems="center">
              <Stat>
                <StatHelpText>
                  <StatArrow type="decrease" />-
                </StatHelpText>
                <StatNumber fontSize={"22px"}>
                  <Flex>
                    <Text px={2} bg="gray" borderRadius="8px">
                      {userRank}
                    </Text>
                    <Text ml={2}>th</Text>
                  </Flex>
                </StatNumber>
              </Stat>
              <Text textColor="#A0A0A3" fontSize="14px" mt={2}>
                {ranking?.length} players
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
