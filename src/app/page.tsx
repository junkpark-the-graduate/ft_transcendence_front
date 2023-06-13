"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function onClick() {
    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
  }
  return (
    <div>
      <button onClick={onClick}>sign in with 42 intra</button>
    </div>
  );
}
