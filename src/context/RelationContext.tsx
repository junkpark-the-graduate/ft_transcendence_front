"use client";

import React, { ReactNode, useState } from "react";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { useUserDataContext } from "./UserDataContext";

type RelationContextType = {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  isBlocking: boolean;
  setIsBlocking: (value: boolean) => void;
  followingList: number[] | null;
  setFollowingList: React.Dispatch<React.SetStateAction<number[] | null>>;
  blockingList: number[] | null;
  setBlockingList: React.Dispatch<React.SetStateAction<number[] | null>>;
};

const RelationContext = React.createContext<RelationContextType>({
  isFollowing: false,
  setIsFollowing: () => {},
  isBlocking: false,
  setIsBlocking: () => {},
  followingList: null,
  setFollowingList: () => {},
  blockingList: null,
  setBlockingList: () => {},
});

export const useRelationContext = () => React.useContext(RelationContext);

export const RelationContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isBlocking, setIsBlocking] = React.useState(false);
  const [followingList, setFollowingList] = React.useState<number[] | null>(
    null
  );
  const [blockingList, setBlockingList] = React.useState<number[] | null>(null);
  const [error, setError] = useState<any>(null);
  const { myData } = useUserDataContext();

  if (error) {
    throw error;
  }

  React.useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const list = await getFollowingList(myData?.id);
        if (!list) return;
        setFollowingList(list);
      } catch (err: any) {
        setError(err);
      }
    };

    const fetchBlockingList = async () => {
      try {
        const list = await getBlockingList(myData?.id);
        if (!list) return;
        setBlockingList(list);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchFollowingList();
    fetchBlockingList();
  }, [myData?.id]);

  return (
    <RelationContext.Provider
      value={{
        isFollowing,
        setIsFollowing,
        isBlocking,
        setIsBlocking,
        followingList,
        setFollowingList,
        blockingList,
        setBlockingList,
      }}
    >
      {children}
    </RelationContext.Provider>
  );
};
