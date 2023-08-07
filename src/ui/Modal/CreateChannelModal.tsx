"use client";

import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import BaseButton from "../Button/Button";
import { GoPlus } from "react-icons/go";
import Cookies from "js-cookie";
import { useState } from "react";
import { EChannelType } from "@/app/(chat)/channel/types/EChannelType";
import BaseInput from "../Input/Input";

export interface CreateChannelModalProps {
  channels: any;
  setChannels: any;
  setJoinedChannels: any;
}

export default function CreateChannelModal({
  channels,
  setChannels,
  setJoinedChannels,
  ...props
}: CreateChannelModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = Cookies.get("accessToken");
  const [channelName, setChannelName] = useState<string>("");
  const [channelPassword, setChannelPassword] = useState<string>("");
  const [channelType, setChannelType] = useState<string>(
    EChannelType[EChannelType.public]
  );
  const toast = useToast();

  async function postChannel() {
    const res = await fetch("http://127.0.0.1:3001/channel", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: channelName,
        password: channelPassword,
        type: EChannelType[channelType as keyof typeof EChannelType],
      }),
    });
    return res;
  }

  async function handleCreateChannel() {
    if (
      channelType === EChannelType[EChannelType.protected] &&
      !channelPassword
    ) {
      toast({
        title: "Channel creation error!",
        description: "Please enter a password for the channel",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const res = await postChannel();
    const resJson = await res.json();

    if (res.status > 299) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (
      EChannelType[resJson.type] === EChannelType[EChannelType.public] ||
      EChannelType[resJson.type] === EChannelType[EChannelType.protected]
    ) {
      setChannels([...channels, resJson]);
    }
    setJoinedChannels([...channels, resJson]);
    setChannelName("");
    onClose();
  }

  return (
    <Box>
      <IconButton
        aria-label="채널 추가"
        icon={<GoPlus />}
        bg="#414147"
        borderRadius={"8px"}
        textColor="white"
        _hover={{
          background: "#191919",
        }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={3} bg="#29292D" {...props}>
          <ModalHeader mx={1} py={3}>
            Create New Channel
          </ModalHeader>
          <ModalCloseButton size="sm" m={1} />
          <ModalBody
            mx={4}
            py={6}
            borderTop={"#A0A0A3 1px solid"}
            borderBottom={"#A0A0A3 1px solid"}
          >
            <Box marginBottom={3}>
              <FormControl>
                <FormLabel>Channel Name</FormLabel>
                <BaseInput
                  placeholder="Enter channel name"
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
                    <Divider my={4} borderColor="#A0A0A3" />
                    <FormLabel>Channel Password</FormLabel>
                    <BaseInput
                      placeholder="Enter channel password"
                      value={channelPassword}
                      onChange={(e) => setChannelPassword(e.target.value)}
                    />
                  </FormControl>
                )}
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <BaseButton
              flex="1"
              fontSize={14}
              mr={2}
              my={2}
              size="sm"
              text="create"
              onClick={handleCreateChannel}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
