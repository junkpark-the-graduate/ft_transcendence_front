import BaseHeading from "@/ui/Typo/Heading";
import getRank from "@/utils/user/getRank";
import { UserData } from "@/utils/user/getUserData";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface ScoreProps {
  id: number | undefined;
}

export default function UserScore({ userData }: { userData: UserData }) {
  const topScore: number | undefined = getRank()?.at(0)?.mmr;

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
        <BaseHeading text="Score" />
      </Box>
      <Flex direction={"row"} mt={12}>
        <Box flex={1}>
          <Flex direction="column" alignItems="center">
            <Flex align="baseline">
              <Text fontSize="24px" px={2} bg="gray" borderRadius="8px">
                {userData?.mmr}
              </Text>
              <Text ml={2}>pt</Text>
            </Flex>
            <Text textColor="#A0A0A3" fontSize="14px" mt={2}>
              1st place: {topScore} pt
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
