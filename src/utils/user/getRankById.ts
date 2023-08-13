import { useEffect, useState } from "react";
import getRank, { RankingObject } from "./getRank";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";
import { get } from "http";

export default function getRankById(id: number | undefined) {
  const [rank, setRank] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRankById = async () => {
    const res = await fetchAsyncToBackEnd("/user/ranking/" + id);
    const data = await res.json();
    setRank(data.ranking);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRankById();
  });

  return rank;
}
