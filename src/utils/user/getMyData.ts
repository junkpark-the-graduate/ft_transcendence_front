import { useEffect, useState } from "react";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

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
  const [userData, setUserData] = useState<MyData | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetchAsyncToBackEnd(`/user`);
      const userData = await res.json();
      setUserData(userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return isLoading ? null : userData;
}
