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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import GameResult from "../game/components/GameUserResult";
import GridType1 from "@/ui/Grid/GridType1";
import GameMatchCard from "../game/components/GameMatchCard";
import GameUserResult from "../game/components/GameUserResult";

export default function page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gameResult = {
    score: "10 : 7",
    playTime: 100,
    player1: {
      mmr: 1016,
      mmrChange: 10,
      isWin: true,
      image: "https://bit.ly/dan-abramov",
      name: "김민수",
    },
    player2: {
      mmr: 990,
      mmrChange: 10,
      isWin: false,
      image: "https://bit.ly/dan-abramov",
      name: "김민수222",
    },
  };
  return (
    <GridType1>
      <Text fontSize={20} color={"white"}>
        게임 결과
      </Text>
      <Text fontSize={20} color={"white"}>
        {gameResult.score}
      </Text>
      <Text fontSize={20} color={"white"}>
        {`${gameResult.playTime}s`}
      </Text>
      <HStack w={"100%"} h={"80%"}>
        <GameUserResult user={gameResult.player1} />
        <GameUserResult user={gameResult.player2} />
      </HStack>
    </GridType1>
  );
}
