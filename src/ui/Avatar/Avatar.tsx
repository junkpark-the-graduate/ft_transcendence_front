import { getUserData } from "@/app/user/components/UserDetail";
import {
  Avatar,
  AvatarProps,
  Box,
  Flex,
  Text,
  textDecoration,
} from "@chakra-ui/react";

export interface BaseAvatarProps extends AvatarProps {}

export default function BaseAvatar({ ...props }: BaseAvatarProps) {
  const userData = getUserData();
  return (
    <Flex>
      {/* <Text textColor="white" my="auto" mr="25px" fontWeight={700}>
        {userData?.name}
      </Text> */}
      <Avatar size="sm" src={userData?.image} />
    </Flex>
  );
}
