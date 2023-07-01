import { Button, ButtonProps } from "@chakra-ui/react";

export interface RedButtonProps extends ButtonProps {
  text: string;
  onClick: () => void;
}

export default function RedButton({ text, onClick, ...props }: RedButtonProps) {
  return (
    <Button
      variant="outline"
      bg="none"
      borderColor={"#d1361d"}
      textColor={"#d1361d"}
      borderRadius="15px"
      px="25px"
      fontWeight={600}
      _hover={{
        bg: "none",
      }}
      _focus={{
        bg: "none",
      }}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
}
