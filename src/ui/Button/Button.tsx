import { Button, ButtonProps } from "@chakra-ui/react";

export interface BaseButtonProps extends ButtonProps {
  text: string;
}

export default function BaseButton({
  text,
  onClick,
  ...props
}: BaseButtonProps) {
  return (
    <Button
      bg="#3B3D41"
      textColor="white"
      borderRadius="15px"
      px="25px"
      _hover={{
        background: "#191919",
      }}
      {...props}
    >
      {text}
    </Button>
  );
}
