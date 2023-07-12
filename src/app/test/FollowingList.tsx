"use client";

import { useEffect, useState } from "react";
import { getUserData } from "../user/components/UserDetail";
import { Box } from "@chakra-ui/react";

export function getFollowings(id: number) {
  const [followings, setFollowings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowings = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/follow/${id}`);
      const data = await res.json();
      console.log(data);
      setFollowings(data.followings);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFollowings();
  }, [id]);

  return isLoading ? null : (
    <Box>
      {followings &&
        followings.map((following) => (
          <div key={following.id}>
            <p>User ID: {following.following}</p>
          </div>
        ))}
    </Box>
  );
}

export default function FollowingList() {
  const userData = getUserData();

  const followings = getFollowings(userData?.id);

  return <Box>{followings}</Box>;
}
