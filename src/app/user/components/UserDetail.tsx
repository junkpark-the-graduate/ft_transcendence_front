import { Box, Flex, Avatar, Heading, Text } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { useMyData } from "@/hooks/useMyData";
import { GoGear } from "react-icons/go";

export default function UserDetail() {
  const userData = useMyData();

  return (
    <Box position="relative" px={5} pt={6} borderRadius={8}>
      <Flex align="center" mb={4}>
        <Avatar size="2xl" name={userData?.name} src={userData?.image} />
        <Box ml={10}>
          <Heading fontFamily={"DungGeunMo"} mb={4} size="lg">
            {userData?.name}
          </Heading>
          <Text fontSize={16}>42 ID: {userData?.id}</Text>
          <Text fontSize={16}>email: {userData?.email}</Text>
          <Text fontSize={16}>
            TFA enable: {userData?.twoFactorEnabled ? "true" : "false"}
          </Text>
        </Box>
        <Box position="absolute" bottom={0} right={5}>
          <LinkButton
            leftIcon={<GoGear />}
            text="edit profile"
            goTo="/user/edit"
          />
        </Box>
      </Flex>
    </Box>
  );
}
