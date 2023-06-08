"use client";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [accessToken, setAccessToken] = useState("");

  async function signIn() {
    try {
      const uri: string = `http://localhost:3001/auth?code=${searchParams.code}`;
      const res: AxiosResponse = await axios.post(uri);
      setAccessToken(res.data.jwtToken);
    } catch (err) {
      alert("500");
    }
  }

  useEffect(() => {
    signIn();
  }, []);
  return (
    <div>
      <h1>HelloWorld</h1>
      <p>JWT Token: {accessToken}</p>
    </div>
  );
}

// Page.getInitial
