import { useState } from "react";
import {
  Select,
  Box,
  Button,
  Card,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  CardHeader,
  Heading,
  CardFooter,
  FormLabel,
} from "@chakra-ui/react";
import { socket } from "../socket";

function SliderThumbWithTooltip({
  ballSpeed,
  setBallSpeed,
  showTooltip,
  setShowTooltip,
}: any) {
  return (
    <Slider
      id="slider"
      defaultValue={5}
      min={50}
      max={150}
      colorScheme="gray"
      onChange={(v) => setBallSpeed(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark
        value={50}
        mt="1"
        ml="-2.5"
        fontSize="
      lg"
      >
        50%
      </SliderMark>
      <SliderMark value={100} mt="1" ml="-2.5" fontSize="lg">
        100%
      </SliderMark>
      <SliderMark value={150} mt="1" ml="-2.5" fontSize="lg">
        150%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${ballSpeed}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default function GameSettingCard({ setIsMatching }: any) {
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

  //let ballColor = localStorage.getItem("ballColor");
  const [gameType, setGameType] = useState("normal");
  const [ballSpeed, setBallSpeed] = useState(100);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handleGameType = (event: any) => {
    setGameType(event.target.value);
  };

  const handleStartMatch = () => {
    console.log("start match");
    setIsMatching(true);
    gameType === "normal"
      ? socket.emit("normal_matching")
      : socket.emit("ladder_matching");
  };

  const selectStyle = {
    color: "white",
    w: "75%",
    marginBottom: "20px",
    size: "lg",
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
    <Card align="center" w="100%" h="100%" backgroundColor={"#555555"}>
      <CardHeader color={"white"}>
        <Heading size={"md"}>Game Setting</Heading>
      </CardHeader>
      <FormLabel color={"white"}>Game Type</FormLabel>
      <Select
        // placeholder="Game Type"
        onChange={handleGameType}
        {...selectStyle}
      >
        <option value="normal">Normal</option>
        <option value="ladder">Ladder</option>
      </Select>
      {/* TODO game type을 제외한 설정 값 적용  */}
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
      <Box color="white" w="75%" margin="40px">
        Ball Speed
        {SliderThumbWithTooltip({
          ballSpeed,
          setBallSpeed,
          showTooltip,
          setShowTooltip,
        })}
      </Box>
      <CardFooter position={"absolute"} bottom={"0"} margin={"20px"}>
        <Button onClick={handleStartMatch} alignContent={"center"} size={"lg"}>
          Start Match
        </Button>
      </CardFooter>
    </Card>
  );
}
