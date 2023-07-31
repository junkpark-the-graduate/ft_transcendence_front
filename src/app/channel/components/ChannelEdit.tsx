"use client";

import React, { use, useEffect, useState } from "react";
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
import { GoArrowLeft } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";
import BaseInput from "@/ui/Input/Input";
import BaseButton from "@/ui/Button/Button";

interface Props {
  channelId: number;
}

const ChannelEdit: React.FC<Props> = ({ channelId }) => {
  const [channel, setChannel] = useState<any>({});
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const [channelName, setChannelName] = useState<string>("");
  const [channelPassword, setChannelPassword] = useState<string>("");
  const [channelType, setChannelType] = useState<string>("");
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
    const tmp = await res.json();
    console.log(tmp);
    setChannel(tmp);
    setChannelName(tmp.name);
    // setChannelPassword(tmp.password);
    setChannelType(EChannelType[tmp.type]);
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
          name: channelName,
          password: channelPassword,
          type: EChannelType[channelType as keyof typeof EChannelType],
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
    // e.stopPropagation();

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
      <Box display="flex" flexDirection="column" height="70vh">
        <HStack>
          <BaseIconButton
            icon={<GoArrowLeft size={30} />}
            aria-label={"채팅방으로 돌아가기"}
            onClick={() => {
              console.log(channel);
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
        <Box padding={"20"}>
          <FormControl>
            <FormLabel>Channel Name</FormLabel>
            <BaseInput
              placeholder="Enter new channel name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </FormControl>
          <Divider my={4} borderColor="#A0A0A3" />
          <FormControl mt={2}>
            <FormLabel>Channel Type</FormLabel>
            <RadioGroup
              onChange={(value) => setChannelType(value)}
              value={channelType}
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
            {channelType === EChannelType[EChannelType.protected] && (
              <FormControl mt={4}>
                <FormLabel>Channel Password</FormLabel>
                <BaseInput
                  placeholder="Enter new channel password"
                  value={channelPassword}
                  onChange={(e) => setChannelPassword(e.target.value)}
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
      <Box display="flex" flexDirection="column" height="5vh">
        <BaseButton
          alignSelf="flex-end"
          fontSize={14}
          size="sm"
          text="delete channel"
          onClick={() => deleteChannelHandler()}
        />
      </Box>
    </Box>
  );
};

export default ChannelEdit;
