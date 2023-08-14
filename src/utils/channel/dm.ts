import React from "react";
import { getTokenClient } from "../auth/getTokenClient";

export const createDm = async (userId: number | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/direct?memberId=${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};
