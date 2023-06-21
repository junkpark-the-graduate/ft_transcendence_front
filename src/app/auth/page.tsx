"use client";

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextPageContext } from "next";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { setInterval } from "timers/promises";

const Loading = () => {
  const txt = "login...";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setText(text + txt[count]);
  //     setCount(count + 1);
  //   }, 100);
  //   if (count === txt.length) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // });

  return <h1>{txt}</h1>;
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
      const res = await fetch(`http://127.0.0.1:3001/auth?code=${code}`, {
        method: "POST",
      });

      console.log(res.status);
      // true -> res자체가 redirect된 상태
      if (res.ok) {
        try {
          const json = await res.json();
          if (json.twoFactorToken) {
            Cookies.set("twoFactorToken", json.twoFactorToken);
            router.push("http://127.0.0.1:3000/auth/tfa-loading");
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

  return <h1>Login...</h1>;
}
