"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Welcome from "./components/Welcome/Welcome";

export default function Home() {
  // const router = useRouter();

  // function onClick() {
  //   router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
  // }
  return (
    <div>
      <Welcome />
      {/* <Button
        variant="contained"
        onClick={onClick}
        sx={{
          margin: "0.2rem",
          color: "#233e67",
          backgroundColor: "#90caf9",
          fontWeight: "bold",
        }}
      >
        sign in with 42 intra
      </Button> */}
    </div>
  );
}
