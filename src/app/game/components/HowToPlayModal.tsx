import GameButton from "@/ui/Button/GameButton";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";

export default function HowToPlayModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <GameButton leftIcon={<GoRepo />} onClick={onOpen} text="How to Pong" />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent
          mt={40}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
        >
          <ModalHeader pt={1} pb={3} textAlign="center">
            How to Pong
          </ModalHeader>
          <ModalCloseButton size="sm" m={1} />
          <ModalBody mx={4} py={6} borderTop={"#A0A0A3 1px solid"} mb={2}>
            <Box fontSize={14} fontWeight={200} textAlign="justify">
              Pong은 비디오 게임의 초기 역사에서 중요한 역할을 한 클래식한 게임
              중 하나입니다. Pong은 1972년에 Atari사의 창립자 중 한 명인 Nolan
              Bushnell이 개발한 게임으로, 이는 비디오 게임 산업의 성장과 발전을
              이끈 중요한 출발점 중 하나입니다.
            </Box>
            <Box fontSize={14} fontWeight={200} textAlign="justify" mt={3}>
              두 명의 플레이어는 방향키를 이용하여 각각 화면의 한쪽 끝에 배치된
              패들을 조작합니다. 게임이 시작되면 각 플레이어는 각자의 패들을
              좌우로 움직여 공을 튕겨내며, 공이 상대편 벽에 닿으면 해당
              플레이어는 점수를 획득합니다. 게임은 미리 한쪽 플레이어의 점수가
              10점이 될 때까지 진행됩니다.
            </Box>
            <Box fontSize={14} fontWeight={200} textAlign="justify" mt={3}>
              게임에는 normal과 ladder 두 가지 타입이 있습니다. normal
              게임에서는 mmr 점수가 승패에 영향을 받지 않습니다. 하지만 ladder
              게임에서는 승자가 승점을 얻게됩니다.
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
