"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <div>
      <Welcome />
    </div>
  );
}
