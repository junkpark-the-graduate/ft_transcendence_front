import { Box, Flex, Avatar, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LinkButton from "@/ui/Button/LinkButton";

interface UserData {
  id: number;
  name: string;
  email: string;
  image: string;
  twoFactorEnabled: boolean;
}

export function getToken() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}

export default function UserDetail() {
  const router = useRouter();

  const token = getToken();
  const toast = useToast();
  const [userData, setUserData] = useState<UserData>();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState();
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
      console.log(userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>now loading</p>;
  }

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box position="relative">
      <Flex align="center" mb={4}>
        <Avatar size="xl" name={userData?.name} src={userData?.image} />
        <Box ml={4}>
          <Heading mb={3} size="lg">
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
