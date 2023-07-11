"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, Button, Center, Divider, Heading } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";

const Timer: React.FC = () => {
  const [milliseconds, setMilliseconds] = useState(300000);

  useEffect(() => {
    if (milliseconds > 0) {
      const timerId = setTimeout(() => {
        setMilliseconds(milliseconds - 1000);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [milliseconds]);

  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Number(((milliseconds % 60000) / 1000).toFixed(0));

  return (
    <div>
      Time remaining: {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
};

const VerifyButton = () => {
  const router = useRouter();

  return (
    <BaseButton
      text="verify"
      variant="contained"
      mt={3}
      onClick={async () => {
        const twoFactorToken = Cookies.get("twoFactorToken");
        console.log("twoFactorToken!!!!!!!!!", twoFactorToken);

        const res = await fetch(
          `http://127.0.0.1:3001/auth/tfa?twoFactorToken=${twoFactorToken}`,
          {
            method: "POST",
          }
        );

        const json = await res.json();
        if (!res.ok) {
          alert("2차 인증 실패");
        } else {
          Cookies.set("accessToken", json.accessToken);
          router.refresh();
          router.push("/home");
        }
      }}
    >
      verify
    </BaseButton>
  );
};

export default async function Page() {
  return (
    <Center>
      <Box pt={20}>
        <Heading fontFamily="DungGeunMo" size="md" color="white">
          two-factor authentication
        </Heading>
        <Center flexDirection="column" my={3}>
          <Divider mb={3} />
          <Timer />
          <VerifyButton />
        </Center>
      </Box>
    </Center>
  );
}
