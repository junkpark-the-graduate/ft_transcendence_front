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
      // bg="none"
      bg="#414147"
      borderRadius={"8px"}
      // border={"white solid 1px"}
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
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
}
