import { redirect } from "next/dist/server/api-utils";

async function getAccessTokenWithTfa(twoFactorCode: string) {
  const res = await fetch(
    `http://localhost:3001/auth/tfa/verification?twoFactorCode=${twoFactorCode}`
  );

  if (res.ok) {
    const json = await res.json();
    const accessToken = json.accessToken;
    return accessToken;
  }
  return undefined;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { twoFactorCode?: string };
}) {
  const { twoFactorCode } = searchParams;

  if (twoFactorCode === undefined) {
  } else {
    const accessToken = await getAccessTokenWithTfa(twoFactorCode);
    if (accessToken === undefined) {
      redirect("/");
    } else {
      return <>{accessToken}</>;
    }
  }
}
