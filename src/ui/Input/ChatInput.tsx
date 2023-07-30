import { Input, InputProps } from "@chakra-ui/react";

export interface ChatInputProps extends InputProps {
  placeholder: string;
}

export default function ChatInput({ placeholder, ...props }: ChatInputProps) {
  return (
    <Input
      placeholder={placeholder}
      bg="#191919"
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
