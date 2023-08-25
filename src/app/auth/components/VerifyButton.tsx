"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, Button } from "@chakra-ui/react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

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
    <Box ml={3}>
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </Box>
  );
};

export const VerifyButton = () => {
  const router = useRouter();

  return (
    <Button
      bg="none"
      borderRadius={0}
      textColor="white"
      border="white solid 3px"
      p="20px 30px"
      fontSize="20px"
      _hover={{ background: "#414147" }}
      _focus={{ background: "#414147" }}
      onClick={async () => {
        const twoFactorToken = Cookies.get("twoFactorToken");
        console.log("twoFactorToken!!!!!!!!!", twoFactorToken);

        const res = await fetchAsyncToBackEnd(
          `/auth/tfa?twoFactorToken=${twoFactorToken}`,
          { method: "POST" }
        );

        const json = await res.json();
        if (!res.ok) {
          alert("2차 인증 실패");
        } else {
          Cookies.set("accessToken", json.accessToken);
          router.refresh();
          router.push("/game");
        }
      }}
    >
      2fa verify in {<Timer />}
    </Button>
  );
};
