"use client";

import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameButton from "@/ui/Button/GameButton";
import { verifyTwoFactorCode } from "@/utils/auth/verify";

export default function Page({
  searchParams,
}: {
  searchParams: {
    twoFactorCode?: string;
  };
}) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const { twoFactorCode } = searchParams;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Set isLoading to true when fetching data
      if (twoFactorCode === undefined) {
        setIsLoading(false); // Set isLoading to false when no twoFactorCode
      } else {
        const res = await verifyTwoFactorCode(twoFactorCode);
        if (res.ok) {
          console.log("ok");
          setIsVerified(true);
        } else {
          console.log("not ok");
          setIsVerified(false);
        }
        setIsLoading(false); // Set isLoading to false after fetching and processing data
      }
    }
    fetchData();
  }, [twoFactorCode]);

  return isLoading ? (
    <Heading fontFamily="DungGeunMo" size="md" color="white">
      Loading...
    </Heading>
  ) : (
    <Center>
      <Box
        w="450px"
        p="15px 30px"
        border="#A0A0A3 3px solid"
        boxShadow={"7px 7px black"}
        borderRadius="0"
        bg="#29292D"
      >
        <Center flexDirection="column" my={3}>
          <Heading fontFamily="DungGeunMo" size="md" color="white">
            2차 인증 {isVerified ? "성공" : "실패"}
          </Heading>
          <Divider my={4} />
          {isVerified
            ? "기존 페이지로 돌아가 로그인을 완료해주세요."
            : "다시 시도해주세요."}
          <GameButton
            w="200px"
            mt={6}
            text="close this page"
            onClick={() => {
              window.close();
            }}
          />
        </Center>
      </Box>
    </Center>
  );
}
