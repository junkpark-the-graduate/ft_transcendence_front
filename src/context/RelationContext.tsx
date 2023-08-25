import React, { ReactNode } from "react";
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
  const { myData } = useUserDataContext();

  React.useEffect(() => {
    const fetchFollowingList = async () => {
      const list = await getFollowingList(myData?.id);
      if (list) {
        setFollowingList(list);
      }
    };

    const fetchBlockingList = async () => {
      const list = await getBlockingList(myData?.id);
      if (list) {
        setBlockingList(list);
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
