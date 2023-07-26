"use client";

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  GridItem,
  Grid,
  HStack,
  Spacer,
  StackDivider,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";
import GameUserCard from "./components/GameUserCard";

export default function Page({
  searchParams,
}: {
  searchParams: {
    roomId?: string;
  };
}) {
  const [isMatching, setIsMatching] = useState(false);
  //const [matchingTime, setmatchingTime] = useState("00:00");
  const router = useRouter();

  socket.on("match_found", (data: any) => {
    const { roomId } = data;
    router.push(`/game/join?roomId=${roomId}`);
  });

  function matchingButton(emit: string) {
    setIsMatching(true);
    socket.emit(emit);
  }

  useEffect(() => {
    socket.emit("reconnect", (data: any) => {
      const { roomId } = data;
      if (roomId) router.push(`/game/join?roomId=${roomId}`);
    });
    if (searchParams.roomId) {
      console.log("searchParams.roomId", searchParams.roomId);
      socket.emit("join_room", searchParams.roomId, (data: any) => {
        console.log(data);
      });
    }
  }, []);
  return (
    <GridType2>
      <HStack spacing={"20"} w="100%" h="100%">
        <GameUserCard />
        <GameUserCard />
      </HStack>
    </GridType2>
  );
}

function RoomIdInput() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleClick = () => {
    router.push(`/game/join?roomId=${value}`);
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter roomId"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          Join Room
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
