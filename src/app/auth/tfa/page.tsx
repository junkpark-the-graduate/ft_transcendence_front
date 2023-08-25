"use client";

import { useRouter } from "next/navigation";

async function getAccessToken(twoFactorToken: string, router: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/auth/tfa?twoFactorToken=${twoFactorToken}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (res.ok) {
      const json = await res.json();
      const accessToken = json.accessToken;
      return accessToken;
    }
  } catch (err) {
    console.log(err);
    router.push("/");
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { twoFactorToken?: string };
}) {
  const router = useRouter();
  const twoFactorToken = searchParams.twoFactorToken;
  if (twoFactorToken === undefined) {
    router.push("/");
  }

  const accessToken = await getAccessToken(twoFactorToken!, router);

  return <>{accessToken}</>;
}
