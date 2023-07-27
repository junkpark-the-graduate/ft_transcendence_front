import { getTokenClient } from "../auth/getTokenClient";

export const follow = async (
  userId: number | undefined,
  following: number | undefined,
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch("http://127.0.0.1:3001/follow", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        following: Number(following),
      }),
    });
    setIsFollowing(true);
    localStorage.setItem("isFollowing", JSON.stringify(true));
  } catch (error) {
    console.error(error);
  }
};

export const unfollow = async (
  userId: number | undefined,
  following: number | undefined,
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch(
      `http://127.0.0.1:3001/follow/${userId}/${following}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
        body: JSON.stringify({
          userId: userId,
          following: Number(following),
        }),
      }
    );
    setIsFollowing(false);
    localStorage.setItem("isFollowing", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
