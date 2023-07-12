"use client";

import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import { useEffect, useState } from "react";
import { socket } from "./socket";

const ENDPOINT = "ws://localhost:4242/game";

export default function Page() {
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  //const [matchingTime, setmatchingTime] = useState("00:00");

  useEffect(() => {
    socket.on("match_found", (data: any) => {
      setIsMatchFound(true);
    });
  });
  function normalMatching() {
    setIsMatching(true);
    socket.emit("normal_matching");
  }
  function ladderMatching() {
    setIsMatching(true);
    socket.emit("ladder_matching");
  }
  function cancelMatching() {
    setIsMatching(false);
    socket.emit("cancel_matching");
  }
  return (
    <div>
      {}
      {isMatchFound ? (
        <Game />
      ) : isMatching ? (
        <div>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          {/*{matchingTime}*/}
          <Button onClick={cancelMatching}>Cancel Matching</Button>
        </div>
      ) : (
        <>
          <Button onClick={normalMatching}>Normal Game</Button>
          <Button onClick={ladderMatching}>Ladder Game</Button>
        </>
      )}
    </div>
  );
}
