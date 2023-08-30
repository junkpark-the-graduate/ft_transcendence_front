"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

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

        try {
          const res = await fetchAsyncToBackEnd(
            `/auth/tfa?twoFactorToken=${twoFactorToken}`,
            { method: "POST" }
          );
          const json = await res.json();

          Cookies.set("accessToken", json.accessToken);
          toast({
            title: "two factor authentication success",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.refresh();
          router.push("/game");
        } catch (err: any) {
          toast({
            title: "two factor authentication failed",
            description: "please check your email",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }}
    >
      2fa verify in {<Timer />}
    </Button>
  );
};
