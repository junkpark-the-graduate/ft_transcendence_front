"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  AspectRatio,
  Text,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { socket } from "../socket";

type User = {
  name: string;
  image: string;
  mmr: number;
};

export default function GameMatchCard({ setIsMatching }: any) {
  return (
    <>
      <Card align="center" w="100%" h="100%" backgroundColor={"#555555"}>
        <AspectRatio
          w="70%"
          ratio={1 / 1}
          margin={"30px"}
          borderRadius={"15px"}
        >
          <Skeleton w="100%" h="100%" borderRadius="full" />
        </AspectRatio>
        <Text fontSize={20} color={"white"} h="15%">
          적절한 상대를 찾고 있습니다.
        </Text>
        <Button
          onClick={() => {
            socket.emit("cancel_matching");
            setIsMatching(false);
          }}
        >
          매칭 취소
        </Button>
      </Card>
    </>
  );
}
