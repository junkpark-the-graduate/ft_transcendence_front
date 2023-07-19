import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { Flex } from "@chakra-ui/react";
import { follow, unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";

export default function FollowButton({
  myId,
  userId,
}: {
  myId: number;
  userId: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followingList = getFollowingList(myId);

  useEffect(() => {
    setIsFollowing(
      followingList && followingList.includes(Number(userId)) ? true : false
    );
  }, [followingList, userId]);

  const handleFollow = async () => {
    await follow(myId, userId, setIsFollowing);
  };

  const handleUnfollow = async () => {
    await unfollow(myId, userId, setIsFollowing);
  };

  return (
    <Flex>
      {isFollowing ? (
        <BaseButton
          flex="1"
          size="sm"
          leftIcon={<GoNoEntry />}
          text="unfollow"
          onClick={handleUnfollow}
        />
      ) : (
        <BaseButton
          flex="1"
          size="sm"
          leftIcon={<GoPlusCircle />}
          text="follow"
          onClick={handleFollow}
        />
      )}
    </Flex>
  );
}
