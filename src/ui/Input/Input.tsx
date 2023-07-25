import { Input, InputProps } from "@chakra-ui/react";

export interface BaseInputProps extends InputProps {
  placeholder: string;
}

export default function BaseInput({ placeholder, ...props }: BaseInputProps) {
  return (
    <Input
      placeholder={placeholder}
      bg="#414147"
      textColor="white"
      variant="filled"
      border="none"
      borderRadius="8px"
      _hover={{
        background: "#191919",
      }}
      _focus={{
        borderColor: "#191919",
        background: "#191919",
      }}
      {...props}
    />
  );
}
