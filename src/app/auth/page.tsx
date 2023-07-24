"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./components/Loading";
import { Intro } from "@/ui/Intro/Intro";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter();
  const { code } = searchParams;

  async function signIn() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth?code=${code}`,
        {
          method: "POST",
        }
      );

      console.log(res.status);
      // true -> res자체가 redirect된 상태
      if (res.ok) {
        try {
          const json = await res.json();
          if (json.twoFactorToken) {
            Cookies.set("twoFactorToken", json.twoFactorToken);
            router.push(`/auth/tfa-loading`);
          } else {
            Cookies.set("accessToken", json.accessToken);
            router.push("/home");
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
