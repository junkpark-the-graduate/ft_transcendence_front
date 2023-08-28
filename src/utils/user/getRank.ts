import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export interface RankingObject {
  id: number;
  name: string;
  image: null | string;
  mmr: number;
}

export default function getRank() {
  const [ranking, setRanking] = useState<RankingObject[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (error) {
    throw error;
  }

  const fetchRank = async () => {
    try {
      const res = await fetchAsyncToBackEnd(`/user/ranking`);
      const rankingData = await res.json();
      setRanking(rankingData);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setError(err);
      setIsLoading(false); // Set isLoading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchRank();
  }, []);

  return isLoading ? null : ranking;
}
