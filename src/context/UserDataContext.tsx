import { EUserStatus } from "@/app/user/types/EUserStatus";
import { getMyData } from "@/utils/user/getMyData";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type MyData = {
  id: number;
  name: string;
  email: string;
  image: string;
  twoFactorEnabled: boolean;
  status: EUserStatus;
  mmr: number;
};

type UserDataContextType = {
  myData: MyData | null;
  setMyData: React.Dispatch<React.SetStateAction<MyData | null>>;
  isLoading: boolean;
};

const UserDataContext = createContext<UserDataContextType>({
  myData: null,
  setMyData: () => {},
  isLoading: true,
});

export const useUserDataContext = () => React.useContext(UserDataContext);

export const UserDataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [myData, setMyData] = useState<MyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyData();
      if (data) {
        setMyData(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={{ myData, setMyData, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
