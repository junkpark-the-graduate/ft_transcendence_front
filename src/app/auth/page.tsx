"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./components/Loading";
import { Intro } from "@/ui/Intro/Intro";
import { useToast } from "@chakra-ui/react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter();
  const { code } = searchParams;
  const toast = useToast();

  async function signIn() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth?code=${code}`,
        {
          method: "POST",
        }
      );
      if (res.ok) {
        try {
          const json = await res.json();
          if (json.isFirstLogin) {
            Cookies.set("accessToken", json.accessToken);
            router.replace("/user/edit");
            toast({
              title: "welcome to Ping Pong!",
              description: "사용자 기본 정보를 확인해주세요.",
              status: "info",
              duration: 10000,
              isClosable: true,
            });
            return;
          }
          if (json.twoFactorToken) {
            Cookies.set("twoFactorToken", json.twoFactorToken);
            router.push(`/auth/tfa-loading`);
          } else {
            Cookies.set("accessToken", json.accessToken);
            router.push("/game");
          }
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
        }
      }
    } catch (err) {
      console.error("err: ", err);
    }
  }

  useEffect(() => {
    signIn();
  }, []);

  return <Intro children={<Loading />} />;
}
