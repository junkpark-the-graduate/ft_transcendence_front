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
  const router = useRouter();
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const [users, setUsers] = useState<User[]>([]);

  const getPaginatedUsers = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user/page?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data: User[] = await res.json();
    setUsers((prev) => [...prev, ...data]);
  }, [page, limit, setUsers]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  useEffect(() => {
    getPaginatedUsers();
  }, [getPaginatedUsers]);

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
    return res;
  }

  async function inviteUser(userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/invited-member?memberId=${userId}`,
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

  async function inviteUserHandler(user: User) {
    const res = await inviteUser(user.id);
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
      const resJson2 = await res2.json();
      setMembers(resJson2);
    }
  }
  return (
    <Box>
      <Stack spacing={2} mt={4} px={2}>
        {users.map((user, index) => {
          if (
            !members.find((m) => m.user.id === user.id) &&
            !bannedMembers.find((m) => m.user.id === user.id)
          ) {
            return (
              <React.Fragment key={user.id}>
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
