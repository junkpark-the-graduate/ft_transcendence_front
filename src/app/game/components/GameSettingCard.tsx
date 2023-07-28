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
} from "@chakra-ui/react";
import { socket } from "../socket";

function SliderThumbWithTooltip({
  ballSpeed,
  setballSpeed,
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
      onChange={(v) => setballSpeed(v)}
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
  const [ballColor, setBallColor] = useState("white");
  const [gameType, setGameType] = useState("normal");
  const [ballSpeed, setballSpeed] = useState(100);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSelectBallColor = (event: any) => {
    setBallColor(event.target.value);
  };

  const handleGameType = (event: any) => {
    setGameType(event.target.value);
  };

  const handleStartMatch = () => {
    console.log("start match");
    setIsMatching(true);
    gameType === "normal" || gameType === "Game Type"
      ? socket.emit("normal_matching")
      : socket.emit("ladder_matching");
  };

  const selectStyle = {
    color: "white",
    w: "75%",
    margin: "40px",
    size: "lg",
  };

  return (
    <Card align="center" w="100%" h="100%" backgroundColor={"#555555"}>
      <CardHeader color={"white"}>
        <Heading size={"md"}>Game Setting</Heading>
      </CardHeader>
      <Select
        placeholder="Game Type"
        onChange={handleGameType}
        {...selectStyle}
      >
        <option value="normal">Normal</option>
        <option value="ladder">Ladder</option>
      </Select>
      {/* TODO game type을 제외한 설정 값 적용  */}
      <Select placeholder="Game Background" {...selectStyle}>
        <option value="option1">option1</option>
        <option value="option2">option2</option>
      </Select>
      <Select
        placeholder="Ball Color"
        value={ballColor}
        onChange={handleSelectBallColor}
        {...selectStyle}
      >
        <option value="wihte">⚪</option>
        <option value="black">⚫</option>
        <option value="red">🔴</option>
        <option value="orange">🟠</option>
        <option value="yellow">🟡</option>
        <option value="green">🟢</option>
        <option value="blue">🔵</option>
        <option value="purple">🟣</option>
      </Select>
      <Box color="white" w="75%" margin="40px">
        Ball Speed
        {SliderThumbWithTooltip({
          ballSpeed,
          setballSpeed,
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
