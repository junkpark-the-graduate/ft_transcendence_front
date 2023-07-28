import { getTokenClient } from "../auth/getTokenClient";

export async function fetchAsyncToBackEnd(url: string, input?: RequestInit) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACK_END_POINT}${url}`, {
    ...input,
    headers: {
      Authorization: `Bearer ${getTokenClient()}`,
      ...input?.headers,
    },
  });
}
