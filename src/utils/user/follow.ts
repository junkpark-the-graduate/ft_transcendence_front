import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export const follow = async (
  following: number | undefined,
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetchAsyncToBackEnd(
      `/follow?followingId=${Number(following)}`,
      {
        method: "POST",
      }
    );
    setIsFollowing(true);
    localStorage.setItem("isFollowing", JSON.stringify(true));
  } catch (error) {
    console.error(error);
  }
};

export const unfollow = async (
  following: number | undefined,
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetchAsyncToBackEnd(
      `/follow?followingId=${Number(following)}`,
      {
        method: "DELETE",
      }
    );
    setIsFollowing(false);
    localStorage.setItem("isFollowing", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
