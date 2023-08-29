"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/game/socket";
import GameButton from "../Button/GameButton";

interface IUser {
  id: number;
  image: string;
  name: string;
}

interface InviteGameModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  gameHost: IUser;
  roomId: string;
}

const InviteGameModal: React.FC<InviteGameModalProps> = ({
  isOpen,
  setIsOpen,
  gameHost,
  roomId,
}) => {
  const router = useRouter();

  const onClose = () => {
    socket.emit("decline_invitation", { roomId });
    setIsOpen(false);
  };

  // TODO 호스트가 상대방이 게임 취소한거 알도록 emit을 하던....해야할 듯?
  const cancelHandle = () => {
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          mt={60}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
        >
          <ModalHeader>
            <Text textAlign="center" fontSize={16}>
              ?????? 님이 당신을 게임에 초대했습니다.
            </Text>
          </ModalHeader>
          <ModalBody my={2}>
            <Flex justifyContent="center" gap={6}>
              <GameButton
                w="150px"
                text="참여하기"
                size="sm"
                onClick={() => {
                  console.log("click");
                }}
              />
              <GameButton
                w="150px"
                text="거절하기"
                size="sm"
                onClick={onClose}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InviteGameModal;
