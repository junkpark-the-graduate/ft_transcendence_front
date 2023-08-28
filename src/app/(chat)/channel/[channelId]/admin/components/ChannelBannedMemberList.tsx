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
import { GoTrash } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";
import ChannelInput from "@/ui/Input/ChannelInput";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

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
  const [tmpMembers, setTmpMembers] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  useEffect(() => {
    setTmpMembers(bannedMembers);
  }, [bannedMembers]);

  async function getBannedMembers() {
    try {
      const res = await fetchAsyncToBackEnd(
        `/channel/${channelId}/banned-member`
      );
      const resJson = await res.json();
      if (!resJson) return;
      setBannedMembers(resJson);
    } catch (err: any) {
      setError(err);
    }
  }

  useEffect(() => {
    getBannedMembers();
  }, []);

  async function deleteBannedMember(memberId: number) {
    try {
      const res = await fetchAsyncToBackEnd(
        `/channel/${channelId}/banned-member?memberId=${memberId}`,
        {
          method: "DELETE",
        }
      );

      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function deleteBannedMemberHandler(member: any) {
    if (confirm(`정말로 해당 ${member.user.name} 차단을 해제하시겠습니까?`)) {
      console.log(member);
      const res = await deleteBannedMember(member.user.id);
      if (!res) return;
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

  async function searchChannelMemberHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.value === "") {
      setTmpMembers(bannedMembers);
    } else {
      const tmp: any[] = [];
      bannedMembers.map((m) => {
        if (m.user.name.includes(event.target.value)) {
          tmp.push(m);
        }
      });
      setTmpMembers(tmp);
    }
  }

  return (
    <Box>
      <ChannelInput
        placeholder="search channel member"
        onChange={(event) => {
          searchChannelMemberHandler(event);
        }}
      />
      <Stack spacing={2} mt={4} px={2}>
        {tmpMembers.map((member, index) => (
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
                  icon={<GoTrash />}
                  size="xs"
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
