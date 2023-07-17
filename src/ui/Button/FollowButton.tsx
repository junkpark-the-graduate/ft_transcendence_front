import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { Box, Flex } from "@chakra-ui/react";
import { useTokenClient } from "@/hooks/useTokenClient";
import { useFollowingList } from "@/hooks/useFollowingList";

export default function FollowButton({
  userId,
  following,
}: {
  userId: number;
  following: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followingList = useFollowingList(userId);

  useEffect(() => {
    setIsFollowing(
      followingList && followingList.includes(Number(following)) ? true : false
    );
  }, [followingList, following]);

  const handleFollow = async () => {
    try {
      const res: Response = await fetch("http://127.0.0.1:3001/follow", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${useTokenClient()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          following: Number(following),
        }),
      });
      setIsFollowing(true);
      localStorage.setItem("isFollowing", JSON.stringify(true));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res: Response = await fetch(
        `http://127.0.0.1:3001/follow/${userId}/${following}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useTokenClient()}`,
          },
          body: JSON.stringify({
            userId: userId,
            following: Number(following),
          }),
        }
      );
      setIsFollowing(false);
      localStorage.setItem("isFollowing", JSON.stringify(false));
    } catch (error) {
      console.error(error);
    }
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
