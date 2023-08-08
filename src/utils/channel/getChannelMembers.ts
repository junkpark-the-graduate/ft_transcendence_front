import React from "react";
import { getTokenClient } from "../auth/getTokenClient";

export const getChannelMembers = async (channelId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
