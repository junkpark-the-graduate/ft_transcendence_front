import { Input, InputProps } from "@chakra-ui/react";

export interface BaseInputProps extends InputProps {}

export default function BaseInput({}: BaseInputProps) {
  return (
    <Input
      textColor="white"
      variant="filled"
      borderRadius="8px"
      mr="10px"
      _hover={{
        background: "#191919",
      }}
      _focus={{
        borderColor: "#191919",
        background: "#191919",
      }}
      bg="#3B3D41"
    />
  );
}
