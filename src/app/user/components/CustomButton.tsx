"use client";

import { useRouter } from "next/navigation";

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
    <button
      className={tailwindStyles}
      onClick={() => {
        router.push("/edit");
      }}
    >
      {title}
    </button>
  );
}
