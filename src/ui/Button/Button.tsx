import { Button, ButtonGroup } from "@chakra-ui/react";

export interface BaseButtonProps {
  text: string;
  onClick: () => void;
}

export default function BaseButton({ text, onClick }: BaseButtonProps) {
  return (
    <Button
      bg="#3B3D41"
      textColor="white"
      w="250px"
      borderRadius="15px"
      m="5px"
      _hover={{
        background: "#191919",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
