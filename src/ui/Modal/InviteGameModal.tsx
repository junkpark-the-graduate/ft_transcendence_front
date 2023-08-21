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
import BaseButton from "../Button/Button";

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
          mt={40}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
        >
          <ModalHeader>
            <Text>{gameHost.name} 님이 게임에 초대하셨습니다.</Text>
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="center" gap={16}>
              <BaseButton
                text="참여"
                onClick={() => {
                  router.push(`/game/join?roomId=${roomId}`);
                }}
              />
              <BaseButton text="취소" onClick={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InviteGameModal;
