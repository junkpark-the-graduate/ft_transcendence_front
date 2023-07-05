import { Box, Flex, Avatar, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LinkButton from "@/ui/Button/LinkButton";

interface UserData {
  id: number;
  name: string;
  email: string;
  image: string;
  twoFactorEnabled: boolean;
}

export function getTokenClient() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}

export function getUserData() {
  const token = getTokenClient();
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await res.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return isLoading ? null : userData;
}

export default function UserData() {
  const userData = getUserData();
  const toast = useToast();

  return (
    <Box position="relative">
      <Flex align="center" mb={4}>
        <Avatar size="xl" name={userData?.name} src={userData?.image} />
        <Box ml={4}>
          <Heading fontFamily={"DungGeunMo"} mb={3} size="lg">
            {userData?.name}
          </Heading>
          <Text>42 ID: {userData?.id}</Text>
          <Text>email: {userData?.email}</Text>
          <Text>
            TFA enable: {userData?.twoFactorEnabled ? "true" : "false"}
          </Text>
        </Box>
        <Box position="absolute" bottom={4} right={0}>
          <LinkButton text="Edit Profile" size="sm" goTo="/user/edit" />
        </Box>
      </Flex>
    </Box>
  );
}
