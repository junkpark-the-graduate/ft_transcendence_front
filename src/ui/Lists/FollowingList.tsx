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
import React, { useState } from "react";
import BaseIconButton from "../Button/IconButton";
import {
  GoCircleSlash,
  GoComment,
  GoKebabHorizontal,
  GoNoEntry,
  GoPerson,
} from "react-icons/go";
import { useRouter } from "next/navigation";
import { getTokenClient } from "@/utils/auth/getTokenClient";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { getUserData } from "@/utils/user/getUserData";
import { getMyData } from "@/utils/user/getMyData";

function FollowingListItem({ myId, userId }: { myId: number; userId: number }) {
  const [isFollowing, setIsFollowing] = useState(true);
  const userData = getUserData(userId);
  const router = useRouter();
  const status: string = "online";

  const handleUnfollow = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3001/follow/${myId}/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getTokenClient()}`,
          },
          body: JSON.stringify({
            userId: myId,
            following: userId,
          }),
        }
      );
      localStorage.setItem("isFollowing", JSON.stringify(false));
      setIsFollowing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

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
          icon={<GoComment />}
          aria-label="dm"
          onClick={() => {}}
        />
        <BaseIconButton
          size="sm"
          icon={<GoPerson />}
          aria-label="info"
          onClick={() => {
            router.push(`/user/profile/${userData?.id}`);
          }}
        />
        <Menu>
          <MenuButton as="span" rounded={"full"} cursor={"pointer"}>
            <BaseIconButton
              size="sm"
              icon={<GoKebabHorizontal />}
              aria-label="else"
            />
          </MenuButton>
          <MenuList p="5px 10px" bg="#414147" border={"none"}>
            <MenuItem
              icon={<GoNoEntry />}
              bg="#414147"
              fontSize="11pt"
              onClick={handleUnfollow}
            >
              unfollow
            </MenuItem>
            <MenuItem
              icon={<GoCircleSlash />}
              textColor="red"
              bg="#414147"
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
  const myData = getMyData();
  const myId = myData?.id ?? 0; // Default to 0 if `id` is undefined or null
  const followings = getFollowingList(myId);

  return (
    <Box>
      <Stack spacing={2}>
        {followings &&
          followings.map((following) => (
            <React.Fragment key={following}>
              <FollowingListItem myId={myId} userId={Number(following)} />
              <Divider borderColor="#414147" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
