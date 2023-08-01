"use client";

import ProfileModal from "@/ui/Modal/ProfileModal";
import { getMyData } from "@/utils/user/getMyData";
import { getUserData } from "@/utils/user/getUserData";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
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
import GameResult from "../game/components/GameResult";
import GridType1 from "@/ui/Grid/GridType1";
import GameMatchCard from "../game/components/GameMatchCard";

export default function page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gameResult = {
    score: "10 : 7",
    isWin: true,
    mmr: 1016,
    mmrChange: 0,
    playTime: 100,
  };
  return (
    <GridType1>
      <GameMatchCard />
    </GridType1>
  );
}
