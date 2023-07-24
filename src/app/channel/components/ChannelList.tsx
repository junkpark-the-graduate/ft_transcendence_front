"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { EChannelType } from "../types/EChannelType";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  channels: any[];
}

const ChannelList: React.FC<Props> = ({ channels }) => {
  const router = useRouter();
  const toast = useToast();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);

  if (!Array.isArray(channels)) {
    return <div>Loading...</div>;
  }

  function onOpen(channelId: number) {
    setSelectedChannelId(channelId); // Store the selected channel ID in the state
    setIsOpen(true); // Open the modal
  }

  async function joinChannel(channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(await res.json());
    return res;
  }

  async function onClickChannel(channelId: number) {
    const res = await joinChannel(channelId);

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else if (res.status == 401) {
      toast({
        title: "You are banned member at this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "You cannot enter this channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function joinProtectedChannel(password: string, channelId: number) {
    const accessToken = Cookies.get("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member?password=${password}`,
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

  async function onClickProtectedChannel() {
    const channelId: number = selectedChannelId; // Access the stored selected channel ID
    const enteredPassword = password; // Access the entered password
    const res = await joinProtectedChannel(enteredPassword, channelId);

    const resJson = await res.json();

    if (res.status < 300) {
      router.push(`/channel/${channelId}/chat`);
    } else if (res.status == 401) {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setIsOpen(false); // Close the modal
    setSelectedChannelId(0); // Reset the selected channel ID
    setPassword(""); // Reset the password input
  }

  function goToAdminPage(e: React.MouseEvent, channelId: number) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    //TODO : 관리자 아니면 못들어가게 막음
    router.push(`/channel/${channelId}/admin`); // Change this path to your admin page's path
  }

  function onOpenModal(channelId: number) {
    // "channels" 배열에서 해당 channelId에 맞는 채널을 찾습니다.
    const channel = channels.find((c) => c.id === channelId);

    if (channel) {
      if (channel.type === EChannelType.protected) {
        onOpen(channelId);
      } else {
        onClickChannel(channelId);
      }
    }
  }

  return (
    <>
      <Box>
        <Text fontSize="xl" mt={5}>
          Channel List
        </Text>
        <Flex direction="column" gap={5}>
          {channels.map((channel: any) => (
            <Box
              key={channel.id}
              padding={3}
              shadow="md"
              borderWidth={1}
              borderRadius="md"
              // onClick={() => onClickChannel(channel.id)}
              onClick={() => onOpenModal(channel.id)}
              textAlign={"left"}
              position={"relative"} // Add relative positioning so we can use absolute positioning on child
            >
              <Button
                onClick={(e) => goToAdminPage(e, channel.id)}
                position={"absolute"} // Set the position to absolute
                top={2} // Adjust these values as needed
                right={2} // Adjust these values as needed
              >
                관리자 페이지
              </Button>
              <Text fontSize="xl">{channel.name}</Text>
              <Text fontSize="sm">ID: {channel.id}</Text>
              <Text fontSize="sm">Owner ID: {channel.ownerId}</Text>
              <Text fontSize="sm">Type: {EChannelType[channel.type]}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedChannelId(0); // Reset the selected channel ID when the Modal is closed
          setPassword(""); // Reset the password input when the Modal is closed
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black">비밀번호를 입력하세요</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="black">힌트는 없습니다</FormLabel>
              <Input
                ref={initialRef}
                color="black"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickProtectedChannel}>
              입장
            </Button>
            <Button onClick={() => setIsOpen(false)}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChannelList;
