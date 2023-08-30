import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Divider,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { GoComment, GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { getUserData } from "@/utils/user/getUserData";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import DmIconButton from "@/ui/Button/DmIconButton";
import BaseIconButton from "@/ui/Button/IconButton";
import ProfileModal from "@/ui/Modal/ProfileModal";
import { EChannelType } from "../channel/types/EChannelType";

function ChannelMemberListItem({
  userId,
  isOwner,
  isAdmin,
  channelType,
}: {
  userId: number | undefined;
  isOwner: boolean;
  isAdmin: boolean;
  channelType: EChannelType;
}) {
  const userData = getUserData(userId);
  const router = useRouter();

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
      {userData?.name}
      {EChannelType[Number(channelType)] !== "direct" &&
        isAdmin &&
        !isOwner && <Badge ml={2}>Admin</Badge>}
      {EChannelType[Number(channelType)] !== "direct" && isAdmin && isOwner && (
        <Badge ml={2}>Owner</Badge>
      )}
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
      </Flex>
    </Flex>
  );
}

interface IChannelMemberListProps {
  channelMembers: any[];
  ownerId: number;
  channelType: EChannelType;
}

export default function ChannelMemberList({
  channelMembers,
  ownerId,
  channelType,
}: IChannelMemberListProps) {
  return (
    <Box>
      <Stack spacing={2}>
        {channelMembers &&
          channelMembers.map((member) => {
            const channelMember = channelMembers.find(
              (channelMember) => channelMember.userId === member.user.id
            );
            const isOwner = ownerId === member.user.id ? true : false;
            return (
              <React.Fragment key={member.user.id}>
                <ChannelMemberListItem
                  userId={Number(member.user.id)}
                  isOwner={isOwner}
                  isAdmin={channelMember?.isAdmin}
                  channelType={channelType}
                />
                <Divider borderColor="#414147" />
              </React.Fragment>
            );
          })}
      </Stack>
    </Box>
  );
}
