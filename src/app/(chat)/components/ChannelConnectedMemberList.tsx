import {
  Avatar,
  AvatarBadge,
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

function MemberListItem({ userId }: { userId: number | undefined }) {
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

interface IProps {
  connectedMembers: any[];
}

export default function ChannelConnectedMemberList({
  connectedMembers,
}: IProps) {
  return (
    <Box>
      <Stack spacing={2}>
        {connectedMembers &&
          connectedMembers.map((member) => (
            <React.Fragment key={member.id}>
              <MemberListItem userId={Number(member.id)} />
              <Divider borderColor="#414147" />
            </React.Fragment>
          ))}
      </Stack>
    </Box>
  );
}
