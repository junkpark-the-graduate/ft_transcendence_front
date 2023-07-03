"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
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
  const [channelType, setChannelType] = useState<EChannelType>(
    EChannelType.public
  );

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
          type: channelType,
        }),
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateChannel = async () => {
    const newChannel = await postChannel();
    onCreate(newChannel);
  };

  return (
    <Box padding={5}>
      <Heading marginBottom={5}>Channel</Heading>
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
          <FormLabel>Channel Password</FormLabel>
          <Input
            placeholder="Enter channel password"
            value={channelPassword}
            onChange={(e) => setChannelPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Channel Type</FormLabel>
          <Select
            placeholder="Select channel type"
            value={channelType}
            onChange={(e) =>
              setChannelType(
                EChannelType[e.target.value as keyof typeof EChannelType]
              )
            }
          >
            {Object.keys(EChannelType)
              .filter((key) => isNaN(Number(key)))
              .map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button colorScheme="blue" mt={4} onClick={handleCreateChannel}>
          Create Channel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateChannel;
