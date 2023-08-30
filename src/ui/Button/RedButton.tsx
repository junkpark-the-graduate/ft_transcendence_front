"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export interface RedButtonProps extends ButtonProps {
  text: string;
}

export default function RedButton({ text, onClick, ...props }: RedButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      bg="none"
      borderColor={"#d1361d"}
      textColor={"#d1361d"}
      borderRadius="8px"
      px="25px"
      fontWeight={600}
      _hover={{
        bg: "none",
      }}
      _focus={{
        bg: "none",
      }}
      onClick={() => {
        router.back();
      }}
      {...props}
    >
      {text}
    </Button>
  );
}
