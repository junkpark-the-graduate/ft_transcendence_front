"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useToast,
  HStack,
  Badge,
  FormControl,
  FormLabel,
  Divider,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoTrash } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";
import BaseInput from "@/ui/Input/Input";
import BaseButton from "@/ui/Button/Button";

interface Props {
  channelId: number;
  channel: { [key: string]: any };
  setChannel: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const ChannelEdit: React.FC<Props> = ({ channelId, channel, setChannel }) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [newChannelPassword, setNewChannelPassword] = useState<string>("");
  const [newChannelType, setNewChannelType] = useState<string>("");
  const toast = useToast();

  async function getChannel() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    setChannel(resJson);
    setNewChannelName(resJson.name);
    setNewChannelType(EChannelType[resJson.type]);
  }

  async function updateChannel() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: newChannelName,
          password: newChannelPassword,
          type: EChannelType[newChannelType as keyof typeof EChannelType],
        }),
      }
    );
    return res;
  }

  async function updateChannelHandler() {
    const res = await updateChannel();
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
        title: "Channel updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    setChannel((prev) => ({
      ...prev,
      name: newChannelName,
      type: EChannelType[newChannelType as keyof typeof EChannelType],
    }));
  }

  async function deleteChannel() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}`,
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

  async function deleteChannelHandler() {
    if (confirm("Are you sure you want to delete this channel?") === false) {
      return;
    }
    const res = await deleteChannel();
    //TODO res.json이 안됨 syntax error남 왜?ㅠ.ㅠ
    if (res.status > 299) {
      toast({
        title: "Channel delete failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Channel delete",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    router.push(`/channel`);
  }

  useEffect(() => {
    getChannel();
  }, []);

  return (
    <Box px={6} py={4}>
      <Box display="flex" flexDirection="column" height="75vh">
        <HStack>
          <BaseIconButton
            icon={<GoArrowLeft size={30} />}
            aria-label={"채팅방으로 돌아가기"}
            onClick={() => {
              router.push(`/channel/${channel.id}/chat`);
            }}
          />
          <Text fontSize="2xl" fontWeight="bold">
            {channel.name}
          </Text>
          <Box marginLeft={"auto"}>
            <Badge fontSize="sm">{EChannelType[channel.type]}</Badge>
          </Box>
        </HStack>
        <Box pt={10}>
          <FormControl>
            <FormLabel>Channel Name</FormLabel>
            <BaseInput
              placeholder="Enter new channel name"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
          </FormControl>
          <Divider my={4} borderColor="#A0A0A3" />
          <FormControl mt={2}>
            <FormLabel>Channel Type</FormLabel>
            <RadioGroup
              onChange={(value) => setNewChannelType(value)}
              value={newChannelType}
            >
              <Stack direction="row" spacing={6}>
                {Object.keys(EChannelType)
                  .filter(
                    (key) =>
                      isNaN(Number(key)) &&
                      key !== EChannelType[EChannelType.direct]
                  )
                  .map((key, i) => (
                    <Radio key={i} value={key}>
                      {key}
                    </Radio>
                  ))}
              </Stack>
            </RadioGroup>
            {newChannelType === EChannelType[EChannelType.protected] && (
              <FormControl mt={4}>
                <FormLabel>Channel Password</FormLabel>
                <BaseInput
                  placeholder="Enter new channel password"
                  value={newChannelPassword}
                  onChange={(e) => setNewChannelPassword(e.target.value)}
                />
              </FormControl>
            )}
          </FormControl>
          <BaseButton
            flex="1"
            fontSize={14}
            mr={2}
            my={2}
            size="sm"
            text="edit channel"
            onClick={() => updateChannelHandler()}
          />
        </Box>
      </Box>
      <HStack
        as="button"
        bg="#414147"
        h={"30px"}
        borderRadius={"8px"}
        textColor="white"
        fontSize={15}
        px="25px"
        fontWeight={800}
        _hover={{
          background: "#191919",
        }}
        onClick={() => deleteChannelHandler()}
      >
        <Text>delete channel</Text>
        <GoTrash size={15} />
      </HStack>
    </Box>
  );
};

export default ChannelEdit;
