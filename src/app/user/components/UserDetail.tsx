import {
  Button,
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Switch,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const userData = {
  id: 1,
  name: "John Doe",
  avatar: "https://example.com/avatar.jpg",
  twoFactorAuth: false,
};

export default function UserDetail() {
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
  );
}
