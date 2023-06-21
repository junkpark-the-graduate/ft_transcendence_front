import { redirect } from "next/dist/server/api-utils";

async function verify(twoFactorCode: string) {
  try {
    const res = await fetch(
      `http://back:3001/auth/tfa/verification?twoFactorCode=${twoFactorCode}`,
      {
        method: "POST",
      }
    );
    return res;
  } catch (err) {
    return { ok: false };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    twoFactorCode?: string;
  };
}) {
  const { twoFactorCode } = searchParams;

  if (twoFactorCode === undefined) {
  } else {
    const res = await verify(twoFactorCode);
    if (res.ok) return <h1>인증 완료</h1>;
    else return <h1>다시시도</h1>;
  }
}
