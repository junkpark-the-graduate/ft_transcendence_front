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
    try {
      const res = await fetch(`http://127.0.0.1:3001/auth?code=${code}`, {
        method: "POST",
      });

      if (res.ok) {
        try {
          //console.log();
          const json = await res.json();
          const accessToken = json.accessToken;
          //console.log(accessToken);
          Cookies.set("accessToken", accessToken);
          router.push("/user");
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
