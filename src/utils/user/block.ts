import { getTokenClient } from "../auth/getTokenClient";

export const block = async (
  userId: number | undefined,
  blocking: number | undefined,
  setIsBlocking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch("http://127.0.0.1:3001/block", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        blocking: Number(blocking),
      }),
    });
    setIsBlocking(true);
    localStorage.setItem("isFollowing", JSON.stringify(true));
  } catch (error) {
    console.error(error);
  }
};

export const unblock = async (
  userId: number | undefined,
  blocking: number | undefined,
  setIsBlocking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch(
      `http://127.0.0.1:3001/block/${userId}/${blocking}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
        body: JSON.stringify({
          userId: userId,
          blocking: Number(blocking),
        }),
      }
    );
    setIsBlocking(false);
    localStorage.setItem("isFollowing", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
