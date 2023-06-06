"use client";

import { useRouter } from "next/navigation";

const UID =
  "u-s4t2ud-4155cf0a6c38718ad15878b1a564844536bd776c25746afae43f39eac5ab2b22";

const SECRET =
  "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";

const REDIRECT_URI = encodeURI("http://127.0.0.1:3000/auth");
const AUTH_URL = `https://api.intra.42.fr/oauth/authorize?client_id=${UID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Home() {
  const router = useRouter();
  function onClick() {
    console.log(REDIRECT_URI);
    router.push(AUTH_URL);
  }
  return (
    <div>
      <button onClick={onClick}>sign in with 42 intra</button>
    </div>
  );
}
