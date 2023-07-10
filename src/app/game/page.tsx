"use client";

import { Button } from "@chakra-ui/react";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import { useEffect, useState } from "react";
import { socket } from "./socket";

const ENDPOINT = "ws://localhost:4242/game";

export default function Page() {
  const [isMatchFound, setIsMatchFound] = useState(false);

  useEffect(() => {
    socket.on("match_found", (data: any) => {
      setIsMatchFound(true);
    });
  });
  function startMatchMaking() {
    socket.emit("start_matchmaking");
  }
  return (
    <div>
      <Button onClick={startMatchMaking}>Start!</Button>
      {isMatchFound ? <Game /> : <div>Waiting for match...</div>}
    </div>
  );
}
