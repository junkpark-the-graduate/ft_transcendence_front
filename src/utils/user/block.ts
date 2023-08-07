import { getTokenClient } from "../auth/getTokenClient";

export const block = async (
  userId: number | undefined,
  blocking: number | undefined,
  setIsBlocking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetch(
      `http://127.0.0.1:3001/block?blockingId=${Number(blocking)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
      }
    );
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
      `http://127.0.0.1:3001/block?blockingId=${Number(blocking)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
      }
    );
    setIsBlocking(false);
    localStorage.setItem("isFollowing", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
