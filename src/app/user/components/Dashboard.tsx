import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Avatar,
  Text,
  Stack,
  Switch,
  Badge,
  Heading,
  Divider,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import BaseButton from "@/ui/Button/Button";

import { useRouter } from "next/navigation";
// 임의의 사용자 데이터
const userData = {
  id: 1,
  name: "John Doe",
  avatar: "https://example.com/avatar.jpg",
  twoFactorAuth: false,
  friends: [
    { id: 2, name: "Jane Smith", status: "online" },
    { id: 3, name: "Mike Johnson", status: "offline" },
  ],
  stats: {
    wins: 10,
    losses: 5,
    ladderLevel: 7,
    achievements: ["First Place", "Master of the Game"],
  },
  matchHistory: [
    { id: 1, type: "1v1", result: "win" },
    { id: 2, type: "1v1", result: "loss" },
    { id: 3, type: "ladder", result: "win" },
  ],
};

export default function Dashboard() {
  const toast = useToast();
  const [twoFactorAuth, setTwoFactorAuth] = useState(userData.twoFactorAuth);

  const handleToggleAuth = () => {
    setTwoFactorAuth(!twoFactorAuth);
    toast({
      title: `Two-factor authentication ${
        twoFactorAuth ? "disabled" : "enabled"
      }`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditProfile = () => {
    // Edit profile logic
    toast({
      title: "Edit Profile",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const router = useRouter();

  return (
    <Flex p={4} direction="column">
      <Box>
        <Flex align="center" mb={4}>
          <Avatar size="xl" name={userData.name} src={userData.avatar} />
          <Box ml={4}>
            <Heading size="lg">{userData.name}</Heading>
            <Text>Unique ID: {userData.id}</Text>
          </Box>
        </Flex>

        <Flex align="center" mb={4}>
          <Text mr={2}>Two-Factor Authentication:</Text>
          <Switch
            colorScheme="gray"
            isChecked={twoFactorAuth}
            onChange={handleToggleAuth}
          />
          <Spacer />
          {/* <LinkButton text="Edit Profile" size="sm" goTo="/user/edit" /> */}
          <Button
            size={"sm"}
            onClick={() => {
              router.push("/user/edit");
            }}
          >
            Edit Profile
          </Button>
        </Flex>
      </Box>

      <Divider my={2} />

      <Flex mt={4}>
        <Box flex={3}>
          <Heading size="md" mb={2}>
            Stats
          </Heading>
          <Stack ml={3} spacing={2}>
            <Text>Wins: {userData.stats.wins}</Text>
            <Text>Losses: {userData.stats.losses}</Text>
            <Text>Ladder Level: {userData.stats.ladderLevel}</Text>
            <Heading mt={2} size="sm">
              Achievements
            </Heading>
            <Stack spacing={2}>
              {userData.stats.achievements.map((achievement) => (
                <Flex key={achievement}>
                  <Badge key={achievement}>{achievement}</Badge>
                </Flex>
              ))}
            </Stack>
          </Stack>

          <Divider my={4} />

          <Heading size="md" mb={2}>
            Match History
          </Heading>
          <Stack ml={3} spacing={2}>
            {userData.matchHistory.map((match) => (
              <Flex key={match.id} align="center">
                <Text>{match.type}: </Text>
                <Badge
                  colorScheme={match.result === "win" ? "green" : "red"}
                  ml={2}
                >
                  {match.result}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Box>

        <Box flex={2} pl={4} borderLeft="1px solid #E2E8F0">
          <Heading size="md" mb={2}>
            Friend List
          </Heading>
          <Stack spacing={2}>
            {userData.friends.map((friend) => (
              <Flex key={friend.id} align="center">
                <Avatar size="sm" name={friend.name} mr={2} />
                <Text>{friend.name}</Text>
                <Badge
                  colorScheme={friend.status === "online" ? "green" : "red"}
                  ml={2}
                >
                  {friend.status}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Flex>
      <Divider my={4} />
    </Flex>
  );
}
