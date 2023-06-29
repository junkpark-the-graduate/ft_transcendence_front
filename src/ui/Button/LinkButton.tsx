"use client";

import { ButtonProps } from "@chakra-ui/react";
import BaseButton from "./Button";
import { useRouter } from "next/navigation";

export interface LinkButtonProps extends ButtonProps {
  text: string;
  goTo: string;
}

export default function LinkButton({ text, goTo }: LinkButtonProps) {
  const router = useRouter();

  return (
    <BaseButton
      text={text}
      onClick={() => {
        console.log(router);
        router.push(goTo);
      }}
    />
  );
}
