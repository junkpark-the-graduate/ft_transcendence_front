import { Box, Flex, Avatar, Heading, Text, useToast } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { useMyData } from "@/hooks/useMyData";

export default function UserData() {
  const userData = useMyData();
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
          <LinkButton text="edit profile" goTo="/user/edit" />
        </Box>
      </Flex>
    </Box>
  );
}
