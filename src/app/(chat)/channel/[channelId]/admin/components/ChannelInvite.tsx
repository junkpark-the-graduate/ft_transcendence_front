"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Text,
  Avatar,
  HStack,
  Divider,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GoPlus } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import BaseIconButton from "@/ui/Button/IconButton";
import { useRouter } from "next/navigation";
import ChannelInput from "@/ui/Input/ChannelInput";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  twoFactorEnabled: boolean;
  status: number;
  mmr: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  channelId: number;
  members: any[];
  setMembers: React.Dispatch<React.SetStateAction<any[]>>;
  bannedMembers: any[];
}

const ChannelInvite: React.FC<Props> = ({
  channelId,
  members,
  setMembers,
  bannedMembers,
}) => {
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [tmpSearchName, setTmpSearchName] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  const getPaginatedUsers = useCallback(async () => {
    try {
      const res = await fetchAsyncToBackEnd(
        `/user/page?page=${page}&limit=${limit}&name=${searchName}`
      );
      const resJson: User[] = await res.json();
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  }, [page, limit, searchName]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  useEffect(() => {
    getPaginatedUsers().then((res) => {
      if (!res) return;
      setUsers((prev) => [...prev, ...res]);
    });
  }, [getPaginatedUsers, searchName]);

  async function searchUserHandler(e: React.FormEvent) {
    e.preventDefault();
    setUsers([]);
    setPage(1);
    setSearchName(tmpSearchName);
  }

  async function getChannelMembers() {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${channelId}/member`);
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function inviteUser(userId: number) {
    try {
      const res = await fetchAsyncToBackEnd(
        `/channel/${channelId}/invited-member?memberId=${userId}`,
        {
          method: "POST",
        }
      );
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function inviteUserHandler(user: User) {
    const res = await inviteUser(user.id);
    if (!res) return;
    const resJson = await res.json();
    if (res.status > 299) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${user.name} 유저가 초대됐습니다.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      const res2 = await getChannelMembers();
      if (!res2) return;
      const resJson2 = await res2.json();
      setMembers(resJson2);
    }
  }

  return (
    <Box>
      <form onSubmit={searchUserHandler}>
        <ChannelInput
          placeholder="search user"
          onChange={(e) => setTmpSearchName(e.target.value)}
        />
      </form>
      <Stack spacing={2} mt={4} px={2}>
        {users.map((user, index) => {
          if (
            !members.find((m) => m.user.id === user.id) &&
            !bannedMembers.find((m) => m.user.id === user.id)
          ) {
            return (
              <React.Fragment key={index}>
                <HStack>
                  {user.image && (
                    <Avatar
                      size="sm"
                      src={user.image}
                      name={user.name}
                      mr={4}
                    />
                  )}
                  {!user.image && <Avatar size="sm" name={user.name} mr={4} />}
                  <Text fontSize="md">{user.name}</Text>
                  <Box marginLeft={"auto"}>
                    <BaseIconButton
                      aria-label="invite"
                      icon={<GoPlus />}
                      size="l"
                      ml={2}
                      onClick={() => inviteUserHandler(user)}
                    />
                  </Box>
                </HStack>
                {index !== users.length - 1 && (
                  <Divider borderColor="#414147" />
                )}
              </React.Fragment>
            );
          }
        })}
      </Stack>
      <div ref={ref}></div>
    </Box>
  );
};

export default ChannelInvite;
