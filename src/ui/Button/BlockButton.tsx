import React, { useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoCircleSlash } from "react-icons/go";
import { ButtonProps, Flex } from "@chakra-ui/react";
import { block, unblock } from "@/utils/user/block";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unfollow } from "@/utils/user/follow";
import { useRelationContext } from "@/context/RelationContext";

export interface BlockButtonProps extends ButtonProps {
  myId: number | undefined;
  userId: number | undefined;
  icon: boolean;
}

export default function BlockButton({
  myId,
  userId,
  icon,
  ...props
}: BlockButtonProps) {
  const {
    isFollowing,
    setIsFollowing,
    isBlocking,
    setIsBlocking,
    followingList,
    setFollowingList,
    blockingList,
    setBlockingList,
  } = useRelationContext();

  useEffect(() => {
    setIsBlocking(blockingList ? blockingList.includes(Number(userId)) : false);
  }, [blockingList, userId]);

  const handleBlock = async () => {
    await block(userId, () => setIsBlocking(true));
    if (isFollowing === true) {
      await unfollow(userId, () => setIsFollowing(false));
    }
    if (followingList && followingList.includes(Number(userId))) {
      setFollowingList(followingList.filter((id) => id !== Number(userId)));
    }
    setBlockingList((prevList) =>
      prevList ? [...prevList, Number(userId)] : [Number(userId)]
    );
  };

  const handleUnblock = async () => {
    await unblock(userId, () => setIsBlocking(false));
    setBlockingList((prevList) =>
      prevList ? prevList.filter((id) => id !== Number(userId)) : []
    );
  };

  return icon ? (
    <Flex>
      <BaseButton
        textColor={"red"}
        flex="1"
        size="sm"
        leftIcon={isBlocking ? <GoCircleSlash /> : <GoCircleSlash />}
        text={isBlocking ? "unblock" : "block"}
        onClick={isBlocking ? handleUnblock : handleBlock}
        bg={isBlocking ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }}
        {...props}
      />
    </Flex>
  ) : (
    <Flex>
      <BaseButton
        w="85px"
        flex="1"
        fontSize={14}
        size="sm"
        text={isBlocking ? "unblock" : "block"}
        onClick={isBlocking ? handleUnblock : handleBlock}
        bg={isBlocking ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }}
        {...props}
      />
    </Flex>
  );
}
