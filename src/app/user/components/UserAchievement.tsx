import BaseHeading from "@/ui/Typo/Heading";
import { Badge, Box, Divider, Flex, Stack } from "@chakra-ui/react";
import { userDummyData } from "./Dashboard";

export default function UserAchievement() {
  return (
    <Box flex={1} bg="#414147" px={5} pt={3} pb={5} borderRadius={8}>
      <BaseHeading text="Achievements" size="md" />
      <Divider mt={3} mb={4} />
      <Stack spacing={2}>
        {userDummyData.stats.achievements.map((achievement) => (
          <Flex key={achievement}>
            <Badge key={achievement}>{achievement}</Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
