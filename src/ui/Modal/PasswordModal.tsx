"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";
import { GoPlus } from "react-icons/go";

// interface PasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onEnter: (password: string) => void;
//   errorMessage: string;
// }

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

  const handleEnter = async () => {
    const res = await joinProtectedChannel(password, channelId);
    const resJson = await res.json();

    if (res.status < 300) {
      setIsOpen(false);
      router.push(`/channel/${channelId}/chat`);
    } else {
      setErrorMessage(resJson.message);
    }
  };

  return (
    <Box
    // border={"white 1px solid"}
    >
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black">비밀번호를 입력하세요</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="black">힌트는 없습니다</FormLabel>
              <Input
                color="black"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEnter}>
              입장
            </Button>
            <Button onClick={() => setIsOpen(false)}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PasswordModal;
