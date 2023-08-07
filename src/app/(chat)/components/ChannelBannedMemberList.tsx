"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useToast,
  Divider,
  Avatar,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GoX } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";

interface Props {
  channelId: number;
  bannedMembers: any[];
  setBannedMembers: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChanneBannedMemberlList: React.FC<Props> = ({
  channelId,
  bannedMembers,
  setBannedMembers,
}) => {
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");

  async function getBannedMembers() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    setBannedMembers(resJson);
  }

  useEffect(() => {
    getBannedMembers();
  }, []);

  async function deleteBannedMember(memberId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member?memberId=${memberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  }

  async function deleteBannedMemberHandler(member: any) {
    if (confirm(`정말로 해당 ${member.user.name} 차단을 해제하시겠습니까?`)) {
      console.log(member);
      const res = await deleteBannedMember(member.user.id);
      if (res.status > 299) {
        toast({
          title: "차단 해제에 실패했습니다.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${member.user.name} 차단 해제에 성공했습니다.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setBannedMembers(
          bannedMembers.filter((m) => m.user.id !== member.user.id)
        );
      }
    }
  }

  return (
    <Box>
      <Stack spacing={2} mt={4} px={2}>
        {bannedMembers.map((member, index) => (
          <React.Fragment key={member.user.id}>
            <HStack>
              <Avatar
                size="sm"
                src={member.user.image}
                name={member.user.name}
                mr={4}
              />
              <Text fontSize="md">{member.user.name}</Text>
              <Box marginLeft={"auto"}>
                <BaseIconButton
                  aria-label="ban"
                  icon={<GoX />}
                  size="m"
                  ml={2}
                  onClick={() => deleteBannedMemberHandler(member)}
                />
              </Box>
            </HStack>
            {index !== bannedMembers.length && ( // 변경된 부분: 마지막 요소 제외
              <Divider borderColor="#414147" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default ChanneBannedMemberlList;
