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
  useToast,
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
import { block, unblock } from "@/utils/user/block";
import { follow, unfollow } from "@/utils/user/follow";
import { getUserStatus } from "@/utils/user/getUserStatus";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import ProfileModal from "../Modal/ProfileModal";
import Cookies from "js-cookie";
import DmIconButton from "../Button/DmIconButton";

function FollowingListItem({
  myId,
  userId,
}: {
  myId: number | undefined;
  userId: number | undefined;
}) {
  const accessToken = Cookies.get("accessToken");
  const userData = getUserData(userId);
  const userStatus = getUserStatus(userId);
  const router = useRouter();
  const toast = useToast();
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
  const myData = getMyData();
  const followings = getFollowingList(myData?.id);

  return (
    <Box>
      <Stack spacing={2}>
        {followings &&
          followings.map((following) => (
            <React.Fragment key={following}>
              <FollowingListItem myId={myData?.id} userId={Number(following)} />
              <Divider borderColor="#414147" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
function toast(arg0: {
  title: any;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
