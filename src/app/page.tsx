"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();

  function onClick() {
    router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
  }
  return (
    <div>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          color: "#0b131f",
          backgroundColor: "#90caf9",
          fontWeight: "bold",
        }}
      >
        sign in with 42 intra
      </Button>
    </div>
  );
}
