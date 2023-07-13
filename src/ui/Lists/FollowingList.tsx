import { useEffect, useState } from "react";
import { getUserData } from "../../app/user/components/UserDetail";
import { Box } from "@chakra-ui/react";

export function getFollowingList(userId: number) {
  const [followings, setFollowings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowings = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/follow/${userId}`);
      const data = await res.json();
      setIsLoading(false);
      setFollowings(data.map((x: any) => x.following));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFollowings();
  }, [userId]);

  return isLoading ? null : followings;
}

export default function FollowingList() {
  const userData = getUserData();
  const userId = userData?.id ?? 0; // Default to 0 if `id` is undefined or null
  const followings = getFollowingList(userId);

  return (
    <Box>
      {followings &&
        followings.map((following) => (
          <div key={following}>
            <p>User ID: {following}</p>
          </div>
        ))}
    </Box>
  );
}
