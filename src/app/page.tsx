"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Center,
  Flex,
  CardHeader,
  CardBody,
  Heading,
  Divider,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import BaseCard from "@/ui/Card/Card";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Flex
        width={"100vw"}
        height={"30vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center>
          <BaseCard>
            <CardHeader>
              <Heading size="md" color="white" fontFamily="futura">
                welcome to ping-pong !
              </Heading>
            </CardHeader>
            <Divider borderColor="white" />
            <CardBody alignContent="center">
              <Center flexDirection="column"></Center>
              <Center>
                <BaseButton
                  text="sign in with 42 intra"
                  onClick={() => {
                    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
                  }}
                />
              </Center>
            </CardBody>
          </BaseCard>
        </Center>
      </Flex>
    </>
  );
}
