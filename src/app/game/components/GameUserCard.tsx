// "use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Box,
  AspectRatio,
  Text,
  Center,
} from "@chakra-ui/react";

async function getUser(id: number) {
  const response = await fetch(`http://back:3001/user/${id}`);
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }
  const data = await response.json();
  return data;
}

export default async function GameUserCard() {
  console.log("HERE");
  console.logw(getUser(9826);
  return (
    <Card align="center" w="100%" h="100%" backgroundColor={"#555555"}>
      <AspectRatio w="70%" ratio={1 / 1} margin={"30px"}>
        <Image w="100%" h="100%" src="/Junkpark.png" />
      </AspectRatio>

      <Text fontSize={20} color={"white"} h="15%">
        Player1
      </Text>

      <Text fontSize={20} color={"white"} h="20%">
        1024
      </Text>

      <Text fontSize={20} color={"white"} h="20%">
        대충 전적
      </Text>
    </Card>
  );
}
