import { Input, InputProps } from "@chakra-ui/react";

export interface ChannelEditInputProps extends InputProps {
  placeholder: string;
  disabled?: boolean;
}

export default function ChannelEditInput({
  placeholder,
  ...props
}: ChannelEditInputProps) {
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
