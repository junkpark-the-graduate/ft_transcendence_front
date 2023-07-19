import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { Flex } from "@chakra-ui/react";
import { follow, unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";

export default function FollowButton({
  userId,
  following,
}: {
  userId: number;
  following: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followingList = getFollowingList(userId);

  useEffect(() => {
    setIsFollowing(
      followingList && followingList.includes(Number(following)) ? true : false
    );
  }, [followingList, following]);

  const handleFollow = async () => {
    await follow(userId, following, setIsFollowing);
  };

  const handleUnfollow = async () => {
    await unfollow(userId, following, setIsFollowing);
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
