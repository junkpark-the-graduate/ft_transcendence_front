import { useEffect, useState } from "react";

export function getFollowingList(userId: number | undefined) {
  const [followings, setFollowings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowings = async () => {
    try {
      if (typeof userId !== "undefined") {
        const res = await fetch(`http://127.0.0.1:3001/follow/${userId}`);
        const data = await res.json();
        setIsLoading(false);
        setFollowings(data.map((x: any) => x.following));
      } else {
        setIsLoading(false); // userId가 undefined이면 isLoading만 false로 변경
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false); // 에러 발생 시에도 isLoading만 false로 변경
    }
  };

  useEffect(() => {
    fetchFollowings();
  }, [userId]);

  return isLoading ? null : followings;
}
