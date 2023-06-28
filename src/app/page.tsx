"use client";

import { useRouter } from "next/navigation";
import "../styles/globals.css";
import {
  Center,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Divider,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import BaseInput from "@/ui/Input/Input";

export default function Test() {
  const router = useRouter();

  return (
    <>
      <Flex
        width={"100vw"}
        height={"25vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center>
          <Card
            bg="#29292D"
            w="350px"
            h="210px"
            pos="relative"
            align="center"
            variant="filled"
            fontFamily="futura"
            borderRadius="12px"
          >
            <CardHeader>
              <Heading size="md" color="white" fontFamily="futura">
                welcome to ping-pong !
              </Heading>
            </CardHeader>
            <Divider w="85%" borderColor="white" />
            <CardBody alignContent="center">
              <Center flexDirection="column">
                <BaseInput
                  placeholder="입력해도 소용없어..."
                  onClick={() => {
                    console.log("input");
                  }}
                />
              </Center>
              <Center>
                <BaseButton
                  text="sign in with 42 intra"
                  onClick={() => {
                    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
                  }}
                />
              </Center>
            </CardBody>
          </Card>
        </Center>
      </Flex>
    </>
  );
}
