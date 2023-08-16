import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export const block = async (
  blocking: number | undefined,
  setIsBlocking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetchAsyncToBackEnd(
      `/block?blockingId=${Number(blocking)}`,
      {
        method: "POST",
      }
    );
    setIsBlocking(true);
    localStorage.setItem("isBlocking", JSON.stringify(true));
  } catch (error) {
    console.error(error);
  }
};

export const unblock = async (
  blocking: number | undefined,
  setIsBlocking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res: Response = await fetchAsyncToBackEnd(
      `/block?blockingId=${Number(blocking)}`,
      {
        method: "DELETE",
      }
    );
    setIsBlocking(false);
    localStorage.setItem("isBlocking", JSON.stringify(false));
  } catch (error) {
    console.error(error);
  }
};
