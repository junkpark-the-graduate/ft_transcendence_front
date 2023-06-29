"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Center, Heading } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import BaseBox from "@/ui/Box/Box";

export default function Home() {
  const router = useRouter();

  return (
    <Center>
      <BaseBox>
        <Heading size="md" color="white">
          welcome to ping-pong !
        </Heading>
        <Center flexDirection="column"></Center>
        <Center mt={6}>
          <BaseButton
            text="sign in with 42 intra"
            onClick={() => {
              router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
            }}
          />
        </Center>
      </BaseBox>
    </Center>
  );
}
