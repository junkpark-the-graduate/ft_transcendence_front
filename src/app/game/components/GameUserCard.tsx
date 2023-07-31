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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

type User = {
  name: string;
  image: string;
  mmr: number;
};

export default function GameUserCard({ user }: { user: User }) {
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <Card align="center" w="100%" h="100%" backgroundColor={"#555555"}>
        <AspectRatio
          w="70%"
          ratio={1 / 1}
          margin={"30px"}
          borderRadius={"15px"}
        >
          <Image w="100%" h="100%" src={user!.image} borderRadius="full" />
        </AspectRatio>
        <Text fontSize={20} color={"white"} h="15%">
          {user!.name}
        </Text>
        <Text fontSize={20} color={"white"} h="20%">
          {user!.mmr}
        </Text>
        <Text fontSize={20} color={"white"} h="20%">
          {"몇 승 몇 패"}
        </Text>
      </Card>
    </>
  );
}
