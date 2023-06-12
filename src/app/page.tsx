"use client";

import { useRouter } from "next/navigation";

// const REDIRECT_URI = encodeURI("http://127.0.0.1:3000/auth");
const AUTH_URL = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_FT_UID}&redirect_uri=${process.env.NEXT_PUBLIC_FT_REDIRECT_URI}&response_type=code`;

export default function Home() {
  const router = useRouter();
  function onClick() {
    router.push(AUTH_URL);
  }
  return (
    <div>
      <button onClick={onClick}>sign in with 42 intra</button>
    </div>
  );
}
