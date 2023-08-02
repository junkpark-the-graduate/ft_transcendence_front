"use client";

import ChannelModal from "@/ui/Modal/ChannelModal";
import PasswordModal from "@/ui/Modal/PasswordModal";
import ProfileModal from "@/ui/Modal/ProfileModal";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

const channelData = {
  channels: [
    { id: 2, name: "channel #1" },
    { id: 3, name: "channel #2" },
    { id: 4, name: "channel #3" },
  ],
};

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);

  return (
    <Flex gap={3}>
      <Box bg="#29292D">
        <ChannelModal channelData={channelData.channels[0]} />
      </Box>
      <Box bg="#29292D">
        <PasswordModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          channelId={selectedChannelId}
        />
      </Box>
    </Flex>
  );
}
