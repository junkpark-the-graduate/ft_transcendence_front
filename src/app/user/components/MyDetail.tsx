import { Box, Flex, Avatar, Heading, Text, Spacer } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { GoCircleSlash, GoGear, GoTrash } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import { getMyData } from "@/utils/user/getMyData";
import { EUserStatus } from "../types/EUserStatus";
import { getUserStatus } from "@/utils/user/getUserStatus";

export default function MyDetail() {
  const myData = getMyData();
  const myId = myData?.id ? myData?.id : 0;

  return (
    <Box position="relative" px={5} pt={6} borderRadius={8}>
      <Flex align="center" mb={4}>
        <Avatar size="2xl" name={myData?.name} src={myData?.image} />
        <Box ml={10}>
          <Heading fontFamily={"DungGeunMo"} mb={4} size="lg">
            {myData?.name}
          </Heading>
          <Text fontSize={16}>42 ID: {myData?.id}</Text>
          <Text fontSize={16}>email: {myData?.email}</Text>
          <Text fontSize={16}>
            TFA enable: {myData?.twoFactorEnabled ? "true" : "false"}
          </Text>
          <Text fontSize={16}>
            status:{" "}
            {myData?.status === EUserStatus.online ? "online" : "offline"}
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
