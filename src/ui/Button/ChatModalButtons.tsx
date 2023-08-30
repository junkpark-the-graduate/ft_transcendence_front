"use client";

import { useEffect, useState } from "react";
import BaseButton from "@/ui/Button/Button";
import { ButtonProps, Flex } from "@chakra-ui/react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import { getTokenClient } from "@/utils/auth/getTokenClient";

interface IBlockingUserId {
  blockingId: number;
}

export interface chatModalButtonProps extends ButtonProps {
  myId: number;
  userId: number;
  setBlockingUserIdList: React.Dispatch<
    React.SetStateAction<IBlockingUserId[]>
  >;
}

export default function ChatModalButtons({
  myId,
  userId,
  setBlockingUserIdList,
  ...props
}: chatModalButtonProps) {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const [followingList, setFollowingList] = useState<any[]>([]);
  const [blockingList, setBlockingList] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  async function getFollowingList(myId: number | undefined) {
    try {
      const res = await fetchAsyncToBackEnd(`/follow/userId`);

      const resJson = await res.json();
      console.log("follwingList", resJson);
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  }

  async function getBlockingList() {
    try {
      const res = await fetchAsyncToBackEnd("/block/userid");

      const resJson = await res.json();
      console.log("blockingList", resJson);
      return resJson;
    } catch (err: any) {
      setError(err);
    }
  }

  async function block(userId: number) {
    try {
      await fetchAsyncToBackEnd(`/block?blockingId=${userId}`, {
        method: "POST",
      });
    } catch (err: any) {
      setError(err);
    }
  }

  async function unblock(userId: number) {
    try {
      await fetchAsyncToBackEnd(`/block?blockingId=${userId}`, {
        method: "DELETE",
      });
    } catch (err: any) {
      setError(err);
    }
  }

  async function follow(userId: number) {
    try {
      await fetchAsyncToBackEnd(`/follow?followingId=${userId}`, {
        method: "POST",
      });
    } catch (err: any) {
      setError(err);
    }
  }

  async function unfollow(userId: number) {
    try {
      await fetchAsyncToBackEnd(`/follow?followingId=${userId}`, {
        method: "DELETE",
      });
    } catch (err: any) {
      setError(err);
    }
  }

  useEffect(() => {
    getFollowingList(myId).then((res) => {
      if (!res) return;
      setFollowingList(res);
    });

    getBlockingList().then((res) => {
      if (!res) return;
      setBlockingList(res);
    });
  }, []);

  useEffect(() => {
    if (!blockingList || !followingList) return;
    setIsBlocking(() => {
      return blockingList.some((item) => item.blockingId === Number(userId));
    });
    setIsFollowing(() => {
      return followingList.some((item) => item.followingId === Number(userId));
    });
  }, [blockingList, followingList]);

  const handleBlock = async (): Promise<void> => {
    await block(userId);
    if (isFollowing === true) {
      await unfollow(userId);
      setIsFollowing(false);
    }
    setBlockingUserIdList((prev) => [...prev, { blockingId: Number(userId) }]);
    setIsBlocking(true);
  };

  const handleUnblock = async () => {
    await unblock(userId);
    setIsBlocking(false);
    setBlockingUserIdList((prev) => [
      ...prev.filter((item) => item.blockingId !== userId),
    ]);
  };

  const handleFollow = async () => {
    await follow(userId);
    if (isBlocking === true) {
      await unblock(userId);
      setIsBlocking(false);
    }
    setIsFollowing(true);
    setBlockingUserIdList((prev) => [
      ...prev.filter((item) => item.blockingId !== userId),
    ]);
  };

  const handleUnfollow = async () => {
    await unfollow(userId);
    setIsFollowing(false);
  };

  return (
    <>
      <Flex>
        <BaseButton
          w="85px"
          fontSize={14}
          flex="1"
          size="sm"
          text={isFollowing ? "unfollow" : "follow"}
          onClick={isFollowing ? handleUnfollow : handleFollow}
          bg={isFollowing ? "#191919" : "#414147"}
          style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
          {...props}
        />
      </Flex>
      <Flex>
        <BaseButton
          w="85px"
          flex="1"
          fontSize={14}
          size="sm"
          text={isBlocking ? "unblock" : "block"}
          onClick={isBlocking ? handleUnblock : handleBlock}
          bg={isBlocking ? "#191919" : "#414147"}
          style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
          {...props}
        />
      </Flex>
    </>
  );
}
