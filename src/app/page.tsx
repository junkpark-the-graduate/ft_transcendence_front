"use client";

import { useRouter } from "next/navigation";
import "../styles/globals.css";
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
                <Button
                  onClick={() => {
                    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
                  }}
                >
                  sign in with 42 intra
                </Button>
              </Center>
            </CardBody>
          </BaseCard>
        </Center>
      </Flex>
    </>
  );
}
