import {
  Box,
  Button,
  Flex,
  Avatar,
  Heading,
  Text,
  Switch,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditButton from "./EditButton";
import Cookies from "js-cookie";
// import { cookies } from "next/headers";

// const userData = {
//   id: 1,
//   name: "John Doe",
//   avatar: "",
//   twoFactorEnabled: false,
// };

interface UserData {
  id: number;
  name: string;
  image: string;
  twoFactorEnabled: boolean;
}

export function getToken() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}

export default function UserDetail() {
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
      // setTwoFactorEnabled(userData.twoFactorEnabled);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>this is not fucking ready</p>;
  }
  // const handleToggleAuth = () => {
  //   setTwoFactorEnabled(!twoFactorEnabled);
  //   toast({
  //     title: `Two-factor authentication ${
  //       twoFactorEnabled ? "disabled" : "enabled"
  //     }`,
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // };

  const handleEditProfile = () => {
    // Edit profile logic
    toast({
      title: "Edit Profile",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex align="center" mb={4}>
        <Avatar size="xl" name={userData?.name} src={userData?.image} />
        <Box ml={4}>
          <Heading size="lg">{userData?.name}</Heading>
          <Text>Unique ID: {userData?.id}</Text>
          {/* <Text> */}
          {/* TFA enable: {userData.twoFactorEnabled ? "true" : "false"} */}
          {/* </Text> */}
        </Box>
      </Flex>
      <Flex align="center" mb={4}>
        <Text mr={2}>Two-Factor Authentication:</Text>
        {/* <Switch
          colorScheme="gray"
          isChecked={twoFactorEnabled}
          onChange={handleToggleAuth}
        /> */}
        <Spacer />
        <EditButton />
      </Flex>
    </Box>
  );
}
