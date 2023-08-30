import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function getBlockingList(userId: number | undefined) {
  try {
    if (typeof userId !== "undefined") {
      const res = await fetchAsyncToBackEnd(`/block/userid`);
      const data = await res.json();
      return data.map((x: any) => x.blockingId);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
