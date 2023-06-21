import { redirect } from "next/navigation";

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
    if (res.ok) {
      return (
        <div>
          <h1>인증 완료</h1>
          <h1>기존 페이지로 돌아가세요.</h1>
        </div>
      );
    } else {
      return <h1>2차인증 실패. 다시 로그인을 시도해주세요</h1>;
    }
  }
}
