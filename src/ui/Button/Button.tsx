import { Button, ButtonProps } from "@chakra-ui/react";

export interface BaseButtonProps extends ButtonProps {
  text: string;
  onClick: () => void;
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
      fontWeight={800}
      _hover={{
        background: "#191919",
      }}
      _focus={{
        background: "#191919",
      }}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
}
