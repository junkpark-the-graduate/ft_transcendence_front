import getRank, { RankingObject } from "./getRank";

export default function getRankById(id: number | undefined) {
  const ranking: RankingObject[] | null | undefined = getRank();

  if (typeof id === "undefined" || !ranking) {
    return;
  }
  const numericId = Number(id);
  const index: number = ranking?.findIndex((obj) => obj.id === numericId) ?? -1;
  return index !== -1 ? index + 1 : undefined;
}
