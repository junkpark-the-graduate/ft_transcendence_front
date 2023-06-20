"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const Timer: React.FC = () => {
  const [milliseconds, setMilliseconds] = useState(300000);

  useEffect(() => {
    if (milliseconds > 0) {
      const timerId = setTimeout(() => {
        setMilliseconds(milliseconds - 1000);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [milliseconds]);

  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Number(((milliseconds % 60000) / 1000).toFixed(0));

  return (
    <div>
      Time remaining: {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
};

const VerifyButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      sx={{
        margin: "0.2rem",
        color: "#0b131f",
        backgroundColor: "#90caf9",
        fontWeight: "bold",
      }}
      onClick={() => {
        // 일단 확인을 해야죠
        router.push("/user");
      }}
    >
      verify
    </Button>
  );
};

export default async function Page() {
  return (
    <div>
      <Timer />
      <VerifyButton />
    </div>
  );
}
