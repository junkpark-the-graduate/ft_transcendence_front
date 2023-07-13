import { useState, useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { getTokenClient } from "../user/components/UserDetail";
import { getFollowingList } from "./FollowingList";

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
      followingList && followingList.includes(following) ? true : false
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
          following: following,
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
            following: following,
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
    <div>
      {isFollowing ? (
        <BaseButton mb={3} text="unfollow" onClick={handleUnfollow} />
      ) : (
        <BaseButton mb={3} text="follow" onClick={handleFollow} />
      )}
    </div>
  );
}
