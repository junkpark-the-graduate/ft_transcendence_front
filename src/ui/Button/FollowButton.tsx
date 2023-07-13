import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { Box } from "@chakra-ui/react";
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
  console.log(`userId: ${userId}, following: ${following}`);
  console.log(followingList);

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
    <Box>
      {isFollowing ? (
        <BaseButton
          size="sm"
          leftIcon={<GoNoEntry />}
          text="unfollow"
          onClick={handleUnfollow}
        />
      ) : (
        <BaseButton
          size="sm"
          leftIcon={<GoPlusCircle />}
          text="follow"
          onClick={handleFollow}
        />
      )}
    </Box>
  );
}
