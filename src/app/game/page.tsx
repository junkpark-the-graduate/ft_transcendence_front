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

  function matchingButton(emit: string) {
    setIsMatching(true);
    socket.emit(emit);
  }

  useEffect(() => {
    socket.on("match_found", (data: any) => {
      setIsMatchFound(true);
    });
  });
  return (
    <div>
      {}
      {isMatchFound ? (
        <Game setIsMatchFound={setIsMatchFound} setIsMatching={setIsMatching} />
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
          <Button onClick={() => matchingButton("cancel_matching")}>
            Cancel Matching
          </Button>
        </div>
      ) : (
        <>
          <Button onClick={() => matchingButton("normal_matching")}>
            Normal Game
          </Button>
          <Button onClick={() => matchingButton("ladder_matching")}>
            Ladder Game
          </Button>
        </>
      )}
    </div>
  );
}
