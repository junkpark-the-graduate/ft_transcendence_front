import { redirect } from "next/navigation";
// import { Router } from "next/router";

async function getAccessToken(twoFactorToken: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:3001/auth/2fa?twoFactorToken=${twoFactorToken}`,
      {
        method: "POST",
      }
    );

    if (res.ok) {
      const json = await res.json();
      const accessToken = json.accessToken;
      return accessToken;
    }
  } catch (err) {
    console.log(err);
    redirect("/");
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { twoFactorToken?: string };
}) {
  const twoFactorToken = searchParams.twoFactorToken;
  if (twoFactorToken === undefined) {
    redirect("/");
  }

  const accessToken = await getAccessToken(twoFactorToken);

  return <>{accessToken}</>;
}
