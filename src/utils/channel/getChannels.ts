import React from "react";
import { getTokenClient } from "../auth/getTokenClient";

export const getChannels = async (
  setChannels: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    setChannels(await res.json());
  } catch (e) {
    console.log(e);
  }
};
