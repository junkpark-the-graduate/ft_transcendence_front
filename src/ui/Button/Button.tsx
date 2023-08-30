import { Button, ButtonProps } from "@chakra-ui/react";

export interface BaseButtonProps extends ButtonProps {
  text: string;
}

export default function BaseButton({ text, ...props }: BaseButtonProps) {
  return (
    <Button
      bg="#414147"
      borderRadius={"8px"}
      textColor="white"
      fontSize={15}
      px="25px"
      fontWeight={800}
      _hover={{
        background: "#191919",
      }}
      _focus={{
        background: "#191919",
      }}
      {...props}
    >
      {text}
    </Button>
  );
}
