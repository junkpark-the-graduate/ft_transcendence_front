import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export function getFollowingList(userId: number | undefined) {
  const [followings, setFollowings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowings = async () => {
    try {
      if (typeof userId !== "undefined") {
        const res = await fetchAsyncToBackEnd(`/follow/userid`);
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
