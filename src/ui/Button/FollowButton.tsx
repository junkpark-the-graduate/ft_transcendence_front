import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { getTokenClient } from "../../app/user/components/UserDetail";
import { getFollowingList } from "../Lists/FollowingList";
import { GoNoEntry, GoPersonAdd, GoPlusCircle } from "react-icons/go";
import { Box, Flex } from "@chakra-ui/react";

export default function FollowButton({
  userId,
  following,
}: {
  userId: number;
  following: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const followingList = getFollowingList(userId);
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
          Authorization: `Bearer ${getTokenClient()}`,
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
            Authorization: `Bearer ${getTokenClient()}`,
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
