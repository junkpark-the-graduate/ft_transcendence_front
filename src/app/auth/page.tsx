"use client";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [decoded, setDecoded] = useState({});
  const [userInfo, setUserInfo] = useState([]);

  async function signIn() {
    try {
      const uri: string = `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth?code=${searchParams.code}`;
      const res: AxiosResponse = await axios.post(uri);

      setAccessToken(res.data.jwtToken);
      const tmp: JwtPayload | string | null = jwt.decode(res.data.jwtToken);
      if (tmp) {
        setDecoded(tmp);
        getUserById(tmp!.sub);
      }
    } catch (err) {
      alert("500");
    }
  }

  async function getUserById(ftId: any) {
    try {
      const uri: string = `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user/${ftId}`;
      const res: AxiosResponse = await axios.get(uri);
      setUserInfo(res.data);
    } catch (err) {
      alert("getUserById err");
    }
  }

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div>
      <h1>HelloWorld</h1>
      <hr />
      <p>JWT Token: {accessToken}</p>
      <p>{userInfo.name}</p>
      <p>{userInfo.email}</p>
      <img src={userInfo.image} />
      <hr />
      <button>email authentication</button>
    </div>
  );
}
