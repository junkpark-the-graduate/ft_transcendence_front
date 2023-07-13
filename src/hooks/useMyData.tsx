import { useEffect, useState } from "react";
import { useTokenClient } from "./useTokenClient";

interface MyData {
  id: number;
  name: string;
  email: string;
  image: string;
  twoFactorEnabled: boolean;
}

export function useMyData() {
  const [userData, setUserData] = useState<MyData>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user`, {
        headers: {
          Authorization: `Bearer ${useTokenClient()}`,
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
