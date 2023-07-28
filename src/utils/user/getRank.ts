import { useEffect, useState } from "react";

export interface RankingObject {
  id: number;
  name: string;
  image: null | string;
  mmr: number;
}

export default function getRank() {
  const [ranking, setRanking] = useState<RankingObject[] | undefined>(); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  const fetchRank = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/user/ranking`);
      const rankingData = await res.json();
      setRanking(rankingData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Set isLoading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchRank();
  }, []);

  return isLoading ? null : ranking;
}