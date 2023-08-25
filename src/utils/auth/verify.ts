import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function verifyTwoFactorCode(twoFactorCode: string) {
  try {
    const res = await fetchAsyncToBackEnd(
      `/auth/tfa-verification?twoFactorCode=${twoFactorCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ twoFactorCode }),
      }
    );
    return res;
  } catch (err) {
    return { ok: false };
  }
}
