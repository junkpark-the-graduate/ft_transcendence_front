import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export default function getRankById(id: number | undefined) {
  const [rank, setRank] = useState<number | undefined>(undefined);

  const fetchRankById = async () => {
    if (id !== undefined) {
      try {
        const res = await fetchAsyncToBackEnd("/user/ranking/" + id);
        const data = await res.json();
        setRank(data.ranking);
      } catch (error) {
        console.error("Error fetching rank:", error);
      }
    }
  };

  useEffect(() => {
    fetchRankById();
  }, [id]);

  return rank;
}
