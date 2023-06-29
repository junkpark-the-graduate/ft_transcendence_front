"use client";

import BaseButton from "./Button";
import { useRouter } from "next/navigation";

export default function LinkButton({
  text,
  goTo,
}: {
  text: string;
  goTo: string;
}) {
  const router = useRouter();

  return (
    <BaseButton
      text={text}
      onClick={() => {
        router.push(goTo);
      }}
    />
  );
}
