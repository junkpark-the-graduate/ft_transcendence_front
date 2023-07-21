import { useEffect, useState } from "react";

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
