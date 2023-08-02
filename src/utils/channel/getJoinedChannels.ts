import { getTokenClient } from "../auth/getTokenClient";

export const getJoinedChannels = async (
  setJoinedChannels: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/joined`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    setJoinedChannels(await res.json());
  } catch (e) {
    console.log(e);
  }
};
