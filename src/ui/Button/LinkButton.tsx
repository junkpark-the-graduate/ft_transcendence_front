"use client";

import BaseButton from "./Button";
import { useRouter } from "next/navigation";

export default function LinkButton({
  text,
  routeLink,
}: {
  text: string;
  routeLink: string;
}) {
  const router = useRouter();

  return (
    <div>
      <BaseButton
        text={text}
        onClick={() => {
          router.push(routeLink);
        }}
      />
    </div>
  );
}
