import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMyData } from "@/hooks/useMyData";
import { useFollowingList } from "@/hooks/useFollowingList";
import { useUserData } from "@/hooks/useUserData";
import React from "react";
import BaseIconButton from "../Button/IconButton";
import {
  GoCircleSlash,
  GoComment,
  GoKebabHorizontal,
  GoNoEntry,
  GoPerson,
} from "react-icons/go";
import { useRouter } from "next/navigation";

function FollowingListItem({ userId }: { userId: number }) {
  const userData = useUserData(userId);
  const router = useRouter();
  const status: string = "online";

  return (
    <Flex align="center" my={1}>
      <Avatar size="sm" name={userData?.name} mr={6}>
        <AvatarBadge
          bg={status === "online" ? "green" : "red"}
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
      <Text>{userData?.name}</Text>
      <Spacer />
      <Flex>
        <BaseIconButton
          size="sm"
          icon={<GoPerson />}
          aria-label="info"
          onClick={() => {
            router.push(`/user/profile/${userData?.id}`);
          }}
        />
        <BaseIconButton
          size="sm"
          icon={<GoComment />}
          aria-label="dm"
          onClick={() => {}}
        />
        <Menu>
          <MenuButton as="span" rounded={"full"} cursor={"pointer"}>
            <BaseIconButton
              size="sm"
              icon={<GoKebabHorizontal />}
              aria-label="else"
            />
          </MenuButton>
          <MenuList p="5px 10px" bg="#3B3D41" border={"none"}>
            <MenuItem
              icon={<GoNoEntry />}
              bg="#3B3D41"
              fontSize="11pt"
              onClick={() => {}}
            >
              unfollow
            </MenuItem>
            <MenuItem
              icon={<GoCircleSlash />}
              textColor="red"
              bg="#3B3D41"
              fontSize="11pt"
              onClick={() => {}}
            >
              block this user
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default function FollowingList() {
  const myData = useMyData();
  const userId = myData?.id ?? 0; // Default to 0 if `id` is undefined or null
  const followings = useFollowingList(userId);

  return (
    <Box>
      <Stack spacing={2}>
        {followings &&
          followings.map((following) => (
            <React.Fragment key={following}>
              <FollowingListItem userId={Number(following)} />
              <Divider borderColor="#3B3D41" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
