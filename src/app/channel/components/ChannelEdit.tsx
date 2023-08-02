"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useToast,
  HStack,
  FormControl,
  FormLabel,
  Divider,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoTrash } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";
import ChannelBadge from "./ChannelBadge";
import ChannelEditInput from "@/ui/Input/ChannelEditInput";

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
    <Box w="full" h="full" borderRadius="8px" bg="#414147" px={4} py={2}>
      <Flex alignItems="center">
        <BaseIconButton
          size="sm"
          icon={<GoArrowLeft />}
          aria-label="go back"
          onClick={() => {
            router.push(`/channel/${channel.id}/chat`);
          }}
        />
        <Text ml={1}>{channel.name}</Text>
        <Spacer />
        <ChannelBadge type={Number(channel.type)} />
      </Flex>
      <Divider mt={2} mb={3} />
      <Box px={2} width="100%" height="82%" overflowY="auto" maxHeight="80vh">
        <FormControl>
          <FormLabel> New Channel Name</FormLabel>
          <ChannelEditInput
            placeholder="Enter new channel name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          />
        </FormControl>
        <Divider my={4} borderColor="#A0A0A3" />
        <FormControl mt={2}>
          <FormLabel>New Channel Type</FormLabel>
          <RadioGroup
            onChange={(value) => {
              setNewChannelType(value);
              if (value !== EChannelType[EChannelType.protected])
                setNewChannelPassword("");
            }}
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
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>New Channel Password</FormLabel>
          <ChannelEditInput
            placeholder="Enter new channel password"
            value={newChannelPassword}
            onChange={(e) => setNewChannelPassword(e.target.value)}
            disabled={newChannelType !== EChannelType[EChannelType.protected]}
          />
        </FormControl>
        <Button
          mt={4}
          fontSize={15}
          type="submit"
          borderRadius={"8px"}
          textColor="white"
          bg="#191919"
          _hover={{
            background: "#191919",
          }}
          _focus={{
            background: "#191919",
          }}
          onClick={() => updateChannelHandler()}
        >
          update channel
        </Button>
      </Box>
      <Divider my={3} />
      <HStack
        as="button"
        h={"40px"}
        borderRadius={"8px"}
        textColor="white"
        px="25px"
        fontSize={15}
        fontWeight={800}
        bg="#191919"
        _hover={{
          background: "#191919",
        }}
        _focus={{
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
