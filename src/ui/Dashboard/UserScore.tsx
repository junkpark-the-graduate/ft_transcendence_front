import BaseHeading from "@/ui/Typo/Heading";
import { getMyData } from "@/utils/user/getMyData";
import {
  Box,
  Flex,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Text,
} from "@chakra-ui/react";

export default function UserScore() {
  const userData = getMyData();
  const userScore = userData?.mmr.toString();

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
      <Stack spacing={2}>
        <Flex direction={"row"}>
          <Box flex={1} pt={2}>
            <Flex direction="column" alignItems="center">
              <Stat>
                <StatHelpText>
                  <StatArrow type="increase" />
                  42
                </StatHelpText>
                <StatNumber fontSize={"22px"}>
                  <Flex>
                    <Text px={2} bg="gray" borderRadius="8px">
                      {userScore}
                    </Text>
                    <Text ml={2}>pt</Text>
                  </Flex>
                </StatNumber>
              </Stat>
              <Text textColor="#A0A0A3" fontSize="14px" mt={2}>
                top 42.42%
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}