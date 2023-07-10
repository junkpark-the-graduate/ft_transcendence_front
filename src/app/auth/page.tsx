"use client";

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextPageContext } from "next";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const Loading = () => {
  const txt = "login";
  const [text, setText] = useState("login");
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const animationFrames = ["", ".", "..", "...", ""];

  useEffect(() => {
    setText(txt + animationFrames[animationIndex]);
  }, [animationIndex]);

  return <h1>{text}</h1>;
};

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
            router.push("/user");
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

  return <Loading />;
}
