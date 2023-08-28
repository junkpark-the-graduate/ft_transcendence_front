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
import { EChannelType } from "../../../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoTrash } from "react-icons/go";
import BaseIconButton from "@/ui/Button/IconButton";

import ChannelInput from "@/ui/Input/ChannelInput";
import ChannelBadge from "@/ui/Badges/ChannelBadge";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

interface Props {
  channelId: number;
  channel: { [key: string]: any };
  setChannel: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const ChannelEdit: React.FC<Props> = ({ channelId, channel, setChannel }) => {
  const router = useRouter();
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [newChannelPassword, setNewChannelPassword] = useState<string>("");
  const [newChannelType, setNewChannelType] = useState<string>("");
  const toast = useToast();
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  async function getChannel() {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${channelId}`);
      const resJson = await res.json();
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  }

  async function updateChannel() {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${channelId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: newChannelName,
          password: newChannelPassword,
          type: EChannelType[newChannelType as keyof typeof EChannelType],
        }),
      });
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function updateChannelHandler() {
    const res = await updateChannel();
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
        title: "Channel updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setChannel((prev) => ({
        ...prev,
        name: newChannelName,
        type: EChannelType[newChannelType as keyof typeof EChannelType],
      }));
    }
  }

  async function deleteChannel() {
    try {
      const res = await fetchAsyncToBackEnd(`/channel/${channelId}`, {
        method: "DELETE",
      });
      return res;
    } catch (err: any) {
      setError(err);
    }
  }

  async function deleteChannelHandler() {
    if (confirm("Are you sure you want to delete this channel?") === false) {
      return;
    }
    const res = await deleteChannel();
    if (!res) return;

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
    getChannel().then((res) => {
      if (!res) return;
      setChannel(res);
      setNewChannelName(res.name);
      setNewChannelType(EChannelType[res.type]);
    });
  }, []);

  return (
    <Box w="full" h="full" borderRadius="8px">
      <Flex alignItems="center">
        <BaseIconButton
          size="sm"
          icon={<GoArrowLeft />}
          aria-label="go back"
          onClick={() => {
            router.push(`/channel/${channel.id}/chat-room`);
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
          <ChannelInput
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
          <ChannelInput
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
