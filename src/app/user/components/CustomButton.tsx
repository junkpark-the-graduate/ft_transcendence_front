"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  title: string;
  tailwindStyles?: string;
  // 특성 추가해주시면 댑니다
}

export default function CustomButton({
  title,
  tailwindStyles,
}: CustomButtonProps) {
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
      className={tailwindStyles}
      onClick={() => {
        router.push("/edit");
      }}
    >
      {title}
    </Button>
  );
}
