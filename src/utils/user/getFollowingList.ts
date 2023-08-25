import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function getFollowingList(userId: number | undefined) {
  try {
    if (typeof userId !== "undefined") {
      const res = await fetchAsyncToBackEnd(`/follow/userid`);
      const data = await res.json();

      return data.map((x: any) => x.followingId);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
