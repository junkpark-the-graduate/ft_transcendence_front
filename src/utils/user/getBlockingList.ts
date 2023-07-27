import { useEffect, useState } from "react";

export function getBlockingList(userId: number | undefined) {
  const [blockings, setBlockings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlockings = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/block/${userId}`);
      const data = await res.json();
      setIsLoading(false);
      setBlockings(data.map((x: any) => x.blocking));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlockings();
  }, [userId]);

  return isLoading ? null : blockings;
}
