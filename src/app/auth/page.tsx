"use client";

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextPageContext } from "next";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter();
  const { code } = searchParams;

  async function signIn() {
    console.log("hello");
    try {
      const res = await fetch(`http://127.0.0.1:3001/auth?code=${code}`, {
        method: "POST",
      });
      console.log("hihi");

      console.log(res.status);
      // true -> res자체가 redirect된 상태

      if (res.ok) {
        try {
          const json = await res.json();
          console.log(json.redirect);
          if (json.redirect) {
            console.log("redirect!!!!!!");
            router.push("http://127.0.0.1:3000/auth/tfa-loading");
          } else {
            console.log("죽여줘!!!!!!!!!!!!!!!!!!!");
            const accessToken = json.accessToken;
            Cookies.set("accessToken", accessToken);
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
