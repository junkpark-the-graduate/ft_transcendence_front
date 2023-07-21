import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { Flex } from "@chakra-ui/react";
import { follow, unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unblock } from "@/utils/user/block";

export default function FollowButton({
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
  }, [followingList, userId]);

  const handleFollow = async () => {
    await follow(myId, userId, setIsFollowing);
    await unblock(myId, userId, setIsBlocking);
  };

  const handleUnfollow = async () => {
    await unfollow(myId, userId, setIsFollowing);
  };

  return (
    <Flex>
      <BaseButton
        flex="1"
        size="sm"
        leftIcon={isFollowing ? <GoNoEntry /> : <GoPlusCircle />}
        text={isFollowing ? "unfollow" : "follow"}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        bg={isFollowing ? "#191919" : "#414147"}
      />
    </Flex>
  );
}
