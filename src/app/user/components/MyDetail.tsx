import { Box, Flex, Avatar, Heading, Text, Spacer } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { GoCircleSlash, GoGear, GoTrash } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import { getMyData } from "@/utils/user/getMyData";

export default function MyDetail() {
  const userData = getMyData();

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
        <Spacer />
        <Flex
          flexDirection={"column"}
          position={"absolute"}
          right={0}
          bottom={0}
        >
          <LinkButton icon={<GoGear />} text="edit profile" goTo="/user/edit" />
          <LinkButton
            icon={<GoCircleSlash />}
            text="blocked users"
            goTo="/user/block"
          />
          <BaseButton
            my={1}
            size="sm"
            textColor={"red"}
            text="delete account"
            leftIcon={<GoTrash />}
            onClick={() => {}}
          />
        </Flex>
      </Flex>
    </Box>
  );
}