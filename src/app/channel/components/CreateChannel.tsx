"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { EChannelType } from "../types/EChannelType";

interface Props {
  onCreate: (channel: any) => void;
}

const CreateChannel: React.FC<Props> = ({ onCreate }) => {
  const accessToken = Cookies.get("accessToken");
  const [channelName, setChannelName] = useState<string>("");
  const [channelPassword, setChannelPassword] = useState<string>("");
  const [channelType, setChannelType] = useState<string>(
    EChannelType[EChannelType.public]
  );
  const toast = useToast();

  const postChannel = async () => {
    try {
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
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateChannel = async () => {
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
    const newChannel = await postChannel();
    onCreate(newChannel);
  };

  return (
    <Box marginBottom={5}>
      <Heading size="md" marginBottom={3}>
        Create a New Channel
      </Heading>
      <FormControl>
        <FormLabel>Channel Name</FormLabel>
        <Input
          placeholder="Enter channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Channel Type</FormLabel>
        <RadioGroup
          onChange={(value) => setChannelType(value)}
          value={channelType}
        >
          <Stack direction="row">
            {Object.keys(EChannelType)
              .filter((key) => isNaN(Number(key)))
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
            <Input
              placeholder="Enter channel password"
              value={channelPassword}
              onChange={(e) => setChannelPassword(e.target.value)}
            />
          </FormControl>
        )}
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleCreateChannel}>
        Create Channel
      </Button>
    </Box>
  );
};

export default CreateChannel;
