"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [accessToken, setAccessToken] = useState("");
  // const [userId, setUserId] = useState(null);
  const [decoded, setDecoded] = useState({});
  const [userInfo, setUserInfo] = useState([]);

  async function signIn() {
    try {
      const uri: string = `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth?code=${searchParams.code}`;
      const res: AxiosResponse = await axios.post(uri);
      const accessToken = res.data.accessToken;

      Cookies.set("accessToken", accessToken);

      setAccessToken(accessToken);
      const tmp: JwtPayload | string | null = jwt.decode(accessToken);
      if (tmp) {
        setDecoded(tmp);
        getUserById(tmp!.sub);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getUserById(ftId: any) {
    try {
      const uri: string = `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user/${ftId}`;
      const res: AxiosResponse = await axios.get(uri);
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
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
      <p>email authentication</p>
      <input
        name="email"
        type="email"
        placeholder="enter your email"
        // onChange={userChangeHandler}
        // disabled={userState.emailAuth}
      />
      <button>send</button>
    </div>
  );
}
