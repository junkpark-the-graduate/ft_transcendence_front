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

  async function getFollowingList(myId: number | undefined) {
    const res = await fetchAsyncToBackEnd(`/follow/userId`);
    const resJson = await res.json();
    console.log("follwingList", resJson);
    return resJson;
  }

  async function getBlockingList() {
    const res = await fetchAsyncToBackEnd("/block/userid");
    const resJson = await res.json();
    console.log("blockingList", resJson);
    return resJson;
  }

  async function block(userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/block?blockingId=${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    console.log("block", resJson);
    return resJson;
  }

  async function unblock(userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/block?blockingId=${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    console.log("unblock", resJson);
    return resJson;
  }

  async function follow(myId: number, userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/follow`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: myId,
          following: Number(userId),
        }),
      }
    );
    console.log("follow", res);
  }

  async function unfollow(myId: number, userId: number) {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/follow/${myId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  useEffect(() => {
    getFollowingList(myId).then((res) => {
      setFollowingList(res);
    });

    getBlockingList().then((res) => {
      setBlockingList(res);
    });
  }, []);

  useEffect(() => {
    if (!blockingList || !followingList) return;
    setIsBlocking(() => {
      return blockingList.some((item) => item.blockingId === Number(userId));
    });
    setIsFollowing(() => {
      return followingList.some((item) => item.following === Number(userId));
    });
  }, [blockingList, followingList]);

  const handleBlock = async (): Promise<void> => {
    await block(userId);
    if (isFollowing === true) {
      await unfollow(myId, userId);
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
    await follow(myId, userId);
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
    await unfollow(myId, userId);
    setIsFollowing(false);
  };

  return (
    <>
      <Flex>
        <BaseButton
          w="90px"
          fontSize={14}
          mr={2}
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
          w="90px"
          flex="1"
          fontSize={14}
          mr={2}
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
