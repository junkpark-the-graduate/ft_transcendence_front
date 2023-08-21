"use client";

import { useRouter } from "next/navigation";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

async function verify(twoFactorCode: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth/tfa-verification?twoFactorCode=${twoFactorCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ twoFactorCode }),
      }
    );
    return res;
  } catch (err) {
    return { ok: false };
  }
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    twoFactorCode?: string;
  };
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const { twoFactorCode } = searchParams;

  useEffect(() => {
    async function fetchData() {
      if (twoFactorCode === undefined) {
        //
      } else {
        const res = await verify(twoFactorCode);
        if (res.ok) {
          console.log("ok");
          setIsVerified(true);
        } else {
          console.log("not ok");
          setIsVerified(false);
        }
      }
    }
    fetchData();
  }, [twoFactorCode]);

  return (
    <Center>
      <Box pt={20}>
        <Heading fontFamily="DungGeunMo" size="md" color="white">
          2차 인증 {isVerified ? "성공" : "실패"}
        </Heading>
        <Center flexDirection="column" my={3}>
          {isVerified
            ? "기존 페이지로 돌아가 로그인을 완료해주세요."
            : "다시 시도해주세요."}
        </Center>
      </Box>
    </Center>
  );
}
