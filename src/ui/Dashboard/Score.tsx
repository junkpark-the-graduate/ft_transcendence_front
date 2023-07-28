import BaseHeading from "@/ui/Typo/Heading";
import { useEffect, useState } from "react";
import { UserData, getUserData } from "@/utils/user/getUserData";
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

export interface ScoreProps {
  id: number | undefined;
}

export default function UserScore({ id }: ScoreProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | undefined>();

  useEffect(() => {
    const fetchUserInfo = async (id: number | undefined) => {
      try {
        if (typeof id !== "undefined") {
          const res = await fetch(`http://127.0.0.1:3001/user/${id}`);
          const userData = await res.json();
          setUserData(userData);
        }
        setIsLoading(false);
      } catch (err) {
        console.log("cannot load the user data");
        setIsLoading(false);
      }
    };

    fetchUserInfo(id);
  }, [id]);

  if (isLoading) {
    // Loading state
    return null;
  }

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
                  <StatArrow type="increase" />-
                </StatHelpText>
                <StatNumber fontSize={"22px"}>
                  <Flex>
                    <Text px={2} bg="gray" borderRadius="8px">
                      {userData?.mmr}
                    </Text>
                    <Text ml={2}>pt</Text>
                  </Flex>
                </StatNumber>
              </Stat>
              <Text textColor="#A0A0A3" fontSize="14px" mt={2}>
                top ??.?? %
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
