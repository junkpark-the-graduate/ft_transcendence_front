import { Button, ButtonProps } from "@chakra-ui/react";

export interface GameButtonProps extends ButtonProps {
  text: string;
}

export default function GameButton({ text, ...props }: GameButtonProps) {
  return (
    <Button
      bg="none"
      w="full"
      borderRadius={0}
      textColor="white"
      border="white solid 2px"
      px={8}
      fontSize="15px"
      _hover={{ background: "#414147" }}
      _focus={{ background: "#414147" }}
      boxShadow={"5px 5px black"}
      {...props}
    >
      {text}
    </Button>
  );
}
