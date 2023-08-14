import { useEffect, useState } from "react";
import { getTokenClient } from "../auth/getTokenClient";

export function getFollowingList(userId: number | undefined) {
  const [followings, setFollowings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowings = async () => {
    try {
      if (typeof userId !== "undefined") {
        const res = await fetch(`http://127.0.0.1:3001/follow/userid`, {
          headers: {
            Authorization: `Bearer ${getTokenClient()}`,
          },
        });
        const data = await res.json();
        setIsLoading(false);
        setFollowings(data.map((x: any) => x.followingId));
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowings();
  }, [userId]);

  return isLoading ? null : followings;
}
