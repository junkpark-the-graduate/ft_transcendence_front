"use client";

import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  Divider,
  Avatar,
  Stack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {
  GoCircleSlash,
  GoMute,
  GoSquirrel,
  GoStar,
  GoStarFill,
} from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";
import { set } from "react-hook-form";

interface Props {
  channelId: number;
  channel: { [key: string]: any };
  members: any[];
  setMembers: React.Dispatch<React.SetStateAction<any[]>>;
  bannedMembers: any[];
  setBannedMembers: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChannelMemberlList: React.FC<Props> = ({
  channelId,
  channel,
  members,
  setMembers,
  bannedMembers,
  setBannedMembers,
}) => {
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");

  async function getChannelMembers() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    setMembers(resJson);
  }

  useEffect(() => {
    getChannelMembers();
  }, []);

  async function banMember(memberId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member?memberId=${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  async function banMemberHandler(member: any) {
    if (confirm(`정말로 해당 ${member.user.name}} 차단하시겠습니까?`)) {
      const res = await banMember(member.user.id);
      if (res.status > 299) {
        toast({
          title: "차단에 실패하였습니다.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${member.user.name} 유저가 차단되었습니다.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setMembers(members.filter((m) => m.user.id !== member.user.id));
        setBannedMembers([...bannedMembers, member]);
      }
    }
  }

  async function adminMember(memberId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/admin?memberId=${memberId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  async function adminMemberHandler(member: any) {
    const res = await adminMember(member.user.id);
    const resJson = await res.json();
    const message = member.isAdmin ? "관리자 해제" : "관리자 등록";

    if (res.status > 299) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    members.map((m) => {
      if (m.user.id === member.user.id) {
        m.isAdmin = !m.isAdmin;
      }
    });
    setMembers([...members]);
  }

  return (
    <Box>
      <Stack spacing={2} mt={4} px={2}>
        {members.map((member, index) => (
          <React.Fragment key={member.user.id}>
            <HStack>
              <Avatar
                size="sm"
                src={member.user.image}
                name={member.user.name}
                mr={4}
              />
              <Text fontSize="md">{member.user.name}</Text>
              <Spacer />
              {channel.ownerId !== member.user.id && (
                <Box>
                  <BaseIconButton
                    aria-label="admin"
                    icon={member.isAdmin ? <GoStarFill /> : <GoStar />}
                    size="xs"
                    ml={2}
                    onClick={() => adminMemberHandler(member)}
                  />
                  <BaseIconButton
                    aria-label="admin"
                    icon={<GoCircleSlash />}
                    size="xs"
                    ml={2}
                    onClick={() => adminMemberHandler(member)}
                  />
                </Box>
              )}
            </HStack>
            {index !== members.length && ( // 변경된 부분: 마지막 요소 제외
              <Divider borderColor="#414147" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default ChannelMemberlList;
