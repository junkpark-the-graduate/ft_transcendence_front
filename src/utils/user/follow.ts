import { getTokenClient } from "../auth/getTokenClient";

export const follow = async (
  following: number | undefined,
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch(
      `http://127.0.0.1:3001/follow?followingId=${Number(following)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
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
    const res: Response = await fetch(
      `http://127.0.0.1:3001/follow?followingId=${Number(following)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
      }
    );
    setIsFollowing(false);
    localStorage.setItem("isFollowing", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
