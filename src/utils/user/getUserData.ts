import { EUserStatus } from "@/app/user/types/EUserStatus";
import { useEffect, useState } from "react";

export interface UserData {
  id: number;
  name: string;
  image: string;
  status: EUserStatus;
  mmr: number;
}

export function getUserData(id: number | undefined) {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async (id: number | undefined) => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user/${id}`);
      const userData = await res.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (err) {
      console.log("cannot load the user data");
    }
  };
  useEffect(() => {
    fetchUserInfo(id);
  }, []);

  return isLoading ? null : userData;
}
