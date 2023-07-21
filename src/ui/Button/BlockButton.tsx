import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoCircleSlash } from "react-icons/go";
import { Flex } from "@chakra-ui/react";
import { block, unblock } from "@/utils/user/block";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";

export default function BlockButton({
  myId,
  userId,
}: {
  myId: number;
  userId: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const followingList = getFollowingList(myId);
  const blockingList = getBlockingList(myId);

  useEffect(() => {
    setIsFollowing(
      followingList && followingList.includes(Number(userId)) ? true : false
    );
    setIsBlocking(
      blockingList && blockingList.includes(Number(userId)) ? true : false
    );
  }, [followingList, blockingList, userId]);

  const handleBlock = async () => {
    await block(myId, userId, setIsBlocking);
    await unfollow(myId, userId, setIsFollowing);
  };

  const handleUnblock = async () => {
    await unblock(myId, userId, setIsBlocking);
  };

  return (
    <Flex>
      <BaseButton
        textColor={"red"}
        flex="1"
        size="sm"
        leftIcon={isBlocking ? <GoCircleSlash /> : <GoCircleSlash />}
        text={isBlocking ? "unblock" : "block"}
        onClick={isBlocking ? handleUnblock : handleBlock}
        bg={isBlocking ? "#191919" : "#414147"}
      />
    </Flex>
  );
}
