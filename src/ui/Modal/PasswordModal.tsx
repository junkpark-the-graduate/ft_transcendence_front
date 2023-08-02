"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BaseButton from "../Button/Button";

interface PasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  channelId: number;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  setIsOpen,
  channelId,
}) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const joinProtectedChannel = async (password: string, channelId: number) => {
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
  };

  const handleEnter = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }

    const res = await joinProtectedChannel(password, channelId);
    const resJson = await res.json();

    if (res.status < 300) {
      setIsOpen(false);
      router.push(`/channel/${channelId}/chat`);
    } else {
      setErrorMessage(resJson.message);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setPassword("");
    setErrorMessage("");
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={2} bg="#29292D">
          <ModalHeader mx={3} mt={2} py={2}>
            비밀번호를 입력하세요
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={3} mb={6}>
            <form onSubmit={handleEnter}>
              <Flex>
                <Input
                  color="white"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <BaseButton type="submit" text="join" ml={3} />
              </Flex>
            </form>
            {errorMessage && (
              <Text mt={4} color={"red"}>
                {errorMessage}
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PasswordModal;
