import { Input } from "@chakra-ui/react";

export interface BaseInputProps {
  placeholder: string;
  onClick: () => void;
}

export default function BaseInput({ placeholder, onClick }: BaseInputProps) {
  return (
    <Input
      placeholder={placeholder}
      textColor="white"
      variant="filled"
      w="250px"
      mb="10px"
      borderRadius="15px"
      _hover={{
        background: "#191919",
      }}
      _focus={{
        borderColor: "#191919",
        background: "#191919",
      }}
      bg="#3B3D41"
      onClick={onClick}
    />
  );
}
