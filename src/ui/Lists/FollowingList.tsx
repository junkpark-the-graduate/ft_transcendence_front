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
  GoPlusCircle,
} from "react-icons/go";
import { useRouter } from "next/navigation";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { getUserData } from "@/utils/user/getUserData";
import { getMyData } from "@/utils/user/getMyData";
import BaseButton from "../Button/Button";
import { block, unblock } from "@/utils/user/block";
import { follow, unfollow } from "@/utils/user/follow";

function FollowingListItem({ myId, userId }: { myId: number; userId: number }) {
  const userData = getUserData(userId);
  const router = useRouter();
  const status: string = "online";
  const [isBlocking, setIsBlocking] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  const handleFollow = async () => {
    await follow(myId, userId, () => setIsFollowing(true));
    await unblock(myId, userId, () => setIsBlocking(false));
  };

  const handleUnfollow = async () => {
    await unfollow(myId, userId, () => setIsFollowing(false));
  };

  const handleBlock = async () => {
    await block(myId, userId, () => setIsBlocking(true));
    await unfollow(myId, userId, () => setIsFollowing(false));
  };

  const handleUnblock = async () => {
    await unblock(myId, userId, () => setIsBlocking(false));
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
      <Text fontSize={14}>{userData?.name}</Text>
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
              icon={isFollowing ? <GoNoEntry /> : <GoPlusCircle />}
              onClick={isFollowing ? handleUnfollow : handleFollow}
              fontSize="11pt"
              bg="#414147"
            >
              {isFollowing ? "unfollow" : "follow"}
            </MenuItem>
            <MenuItem
              textColor={"red"}
              icon={isBlocking ? <GoCircleSlash /> : <GoCircleSlash />}
              onClick={isBlocking ? handleUnblock : handleBlock}
              fontSize="11pt"
              bg="#414147"
            >
              {isBlocking ? "unblock" : "block"}
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
