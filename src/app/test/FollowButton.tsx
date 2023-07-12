"use client";

import { useState } from "react";
import BaseButton from "@/ui/Button/Button";
import { getTokenClient } from "../user/components/UserDetail";

export default function FollowButton({
  userId,
  following,
}: {
  userId: number;
  following: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);

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
      console.log(res);
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
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isFollowing ? (
        <BaseButton text="unfollow" onClick={handleUnfollow} />
      ) : (
        <BaseButton text="follow" onClick={handleFollow} />
      )}
    </div>
  );
}
