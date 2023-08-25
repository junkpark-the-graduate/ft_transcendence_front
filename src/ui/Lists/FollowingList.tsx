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
import { block, unblock } from "@/utils/user/block";
import { follow, unfollow } from "@/utils/user/follow";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import ProfileModal from "../Modal/ProfileModal";
import DmIconButton from "../Button/DmIconButton";
import { useRelationContext } from "@/context/RelationContext";

function FollowingListItem({ userId }: { userId: number | undefined }) {
  if (userId === undefined) {
    return;
  }

  const userData = getUserData(userId);
  const router = useRouter();
  const [isBlocking, setIsBlocking] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const { followingList, setFollowingList } = useRelationContext();

  const handleFollow = async () => {
    await follow(userId, () => setIsFollowing(true));
    await unblock(userId, () => setIsBlocking(false));
    if (followingList) {
      setFollowingList([...followingList, userId]);
    } else {
      setFollowingList([userId]);
    }
  };

  const handleUnfollow = async () => {
    await unfollow(userId, () => setIsFollowing(false));
    if (followingList) {
      setFollowingList(followingList.filter((id) => id !== userId));
    }
  };

  const handleBlock = async () => {
    await block(userId, () => setIsBlocking(true));
    await unfollow(userId, () => setIsFollowing(false));
    if (followingList) {
      setFollowingList(followingList.filter((id) => id !== userId));
    }
  };

  const handleUnblock = async () => {
    await unblock(userId, () => setIsBlocking(false));
  };

  return (
    <Flex align="center" my={1}>
      <Avatar size="sm" src={userData?.image} name={userData?.name} mr={6}>
        <AvatarBadge
          bg={userData?.status === EUserStatus.online ? "green" : "red"}
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
      <ProfileModal userData={userData} />
      <Spacer />
      <Flex>
        <DmIconButton userId={userId} icon={<GoComment />} aria-label="dm" />
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
  const { followingList } = useRelationContext();

  return (
    <Box>
      <Stack spacing={2}>
        {followingList &&
          followingList.map((following) => (
            <React.Fragment key={following}>
              <FollowingListItem userId={Number(following)} />
              <Divider borderColor="#414147" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
