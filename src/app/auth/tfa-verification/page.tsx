"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: {
    twoFactorCode?: string;
  };
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const { twoFactorCode } = searchParams;

  async function verify(twoFactorCode: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth/tfa-verification?twoFactorCode=${twoFactorCode}`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      alert("2차 인증 실패");
      router.push("/");
    }
    setIsVerified(true);
  }

  useEffect(() => {
    if (twoFactorCode === undefined) {
      alert("2차 인증 코드가 없습니다.");
      router.push("/");
    } else {
      verify(twoFactorCode);
    }
  }, []);

  return (
    <>
      {isVerified ? (
        <div>
          <h1>인증 완료</h1>
          <h1>기존 페이지로 돌아가세요.</h1>
        </div>
      ) : (
        <h1>2차 인증 하는중...</h1>
      )}
    </>
  );
}
