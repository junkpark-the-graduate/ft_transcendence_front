import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export function getBlockingList(userId: number | undefined) {
  const [blockings, setBlockings] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlockings = async () => {
    try {
      if (typeof userId !== "undefined") {
        const res = await fetchAsyncToBackEnd(`/block/userid`);
        const data = await res.json();
        setIsLoading(false);
        setBlockings(data.map((x: any) => x.blockingId));
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockings();
  }, [userId]);

  return isLoading ? null : blockings;
}
