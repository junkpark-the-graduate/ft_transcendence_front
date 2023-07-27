"use client";

import { HStack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useRouter } from "next/navigation";
import GridType1 from "@/ui/Grid/GridType1";
import GridType2 from "@/ui/Grid/GridType2";
import GameUserCard from "./components/GameUserCard";
import GameSettingCard from "./components/GameSettingCard";

export default function Page({
  searchParams,
}: {
  searchParams: {
    roomId?: string;
  };
}) {
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  //const [matchingTime, setmatchingTime] = useState("00:00");
  const router = useRouter();

  socket.on("match_found", (data: any) => {
    const { roomId } = data;
    setIsMatched(true);
    setTimeout(() => {
      router.push(`/game/join?roomId=${roomId}`);
    }, 3000);
  });

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
        {/* TODO 내 ftId 받아오기 */}
        <GameUserCard ftId={99951} />
        {isMatching ? (
          isMatched ? (
            // TODO 상대방 ftId 받아오기
            <GameUserCard ftId={99951} />
          ) : (
            <Skeleton w={"100%"} h={"100%"} />
          )
        ) : (
          <GameSettingCard setIsMatching={setIsMatching} />
        )}
      </HStack>
    </GridType2>
  );
}

// function RoomIdInput() {
//   const [value, setValue] = useState("");
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/game/join?roomId=${value}`);
//   };

//   return (
//     <InputGroup size="md">
//       <Input
//         pr="4.5rem"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Enter roomId"
//       />
//       <InputRightElement width="4.5rem">
//         <Button h="1.75rem" size="sm" onClick={handleClick}>
//           Join Room
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   );
// }
