import { useState } from "react";
import {
  Select,
  FormLabel,
  VStack,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { GoGear } from "react-icons/go";
import GameButton from "@/ui/Button/GameButton";

export default function GameSettingModal({ setIsMatching }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ballColor, setBallColor] = useState(localStorage.getItem("ballColor"));
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("backgroundColor")
  );
  const [paddleColor, setPaddleColor] = useState(
    localStorage.getItem("paddleColor")
  );
  const [planeColor, setPlaneColor] = useState(
    localStorage.getItem("planeColor")
  );

  const handleSelectBallColor = (event: any) => {
    setBallColor(event.target.value);
    localStorage.setItem("ballColor", event.target.value);
  };

  const handleSelectBackGroundColor = (event: any) => {
    setBackgroundColor(event.target.value);
    localStorage.setItem("backgroundColor", event.target.value);
  };
  const handleSelectPaddleColor = (event: any) => {
    setPaddleColor(event.target.value);
    localStorage.setItem("paddleColor", event.target.value);
  };
  const handleSelectPlaneColor = (event: any) => {
    setPlaneColor(event.target.value);
    localStorage.setItem("planeColor", event.target.value);
  };

  const selectStyle = {
    color: "white",
    w: "70%",
    marginBottom: 3,
    size: "sm",
    variant: "filled",
    borderRadius: "8px",
    bg: "#191919",
    // _hover: "#191919",
    // _focus: "#191919",
  };

  const colorOptions = () => (
    <>
      <option value="white">⚪ white</option>
      <option value="black">⚫ black</option>
      <option value="red">🔴 red</option>
      <option value="orange">🟠 orange</option>
      <option value="yellow">🟡 yellow</option>
      <option value="green">🟢 green</option>
      <option value="blue">🔵 blue</option>
      <option value="purple">🟣 purple</option>
    </>
  );

  return (
    <Box>
      <GameButton leftIcon={<GoGear />} onClick={onOpen} text="Game Setting" />

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent
          mt={40}
          p={3}
          bg="#29292D"
          // borderRadius={0}
          // border={"white 2px solid"}
          // boxShadow={"7px 7px black"}
        >
          <ModalHeader pt={1} pb={3} textAlign="center">
            Game Setting
          </ModalHeader>
          <ModalCloseButton size="sm" m={1} />
          <ModalBody mx={4} py={6} borderTop={"#A0A0A3 1px solid"}>
            {/* TODO game type을 제외한 설정 값 적용  */}
            <VStack gap={1}>
              <FormLabel color={"white"}>Background Color</FormLabel>
              <Select
                value={backgroundColor ?? "white"}
                onChange={handleSelectBackGroundColor}
                {...selectStyle}
              >
                {colorOptions()}
              </Select>
              <FormLabel color={"white"}>Ball Color</FormLabel>
              <Select
                value={ballColor ? ballColor : "white"}
                onChange={handleSelectBallColor}
                {...selectStyle}
              >
                {colorOptions()}
              </Select>
              <FormLabel color={"white"}>Paddle Color</FormLabel>
              <Select
                value={paddleColor ?? "white"}
                onChange={handleSelectPaddleColor}
                {...selectStyle}
              >
                {colorOptions()}
              </Select>
              <FormLabel color={"white"}>Plane Color</FormLabel>
              <Select
                value={planeColor ?? "white"}
                onChange={handleSelectPlaneColor}
                {...selectStyle}
              >
                {colorOptions()}
              </Select>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
