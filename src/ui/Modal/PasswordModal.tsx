import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Box,
  useDisclosure,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BaseInput from "../Input/Input";
import BaseButton from "../Button/Button";

interface PasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  channelId: number;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  setIsOpen,
  channelId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toast = useToast();

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
      toast({
        description: resJson.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box as="button" onClick={onOpen} fontSize={14}>
        password
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={2} bg="#29292D">
          <ModalHeader mx={3} mt={2} py={2}>
            Enter the Password
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={3} mb={6}>
            <Flex>
              <FormControl>
                <BaseInput
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <BaseButton text="join" ml={3} onClick={handleEnter} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PasswordModal;
