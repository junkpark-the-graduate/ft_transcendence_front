"use client";

import { useEffect, useState } from "react";
import { getTokenClient } from "../auth/getTokenClient";
import { EUserStatus } from "@/app/user/types/EUserStatus";

interface MyData {
  id: number;
  name: string;
  email: string;
  image: string;
  twoFactorEnabled: boolean;
  status: EUserStatus;
  mmr: number;
}

export function getMyData() {
  const [userData, setUserData] = useState<MyData>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user`, {
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
      });
      const userData = await res.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return isLoading ? null : userData;
}
