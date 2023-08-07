import { Input, InputProps } from "@chakra-ui/react";

export interface ChannelInputProps extends InputProps {
  placeholder: string;
  disabled?: boolean;
}

export default function ChannelInput({
  placeholder,
  ...props
}: ChannelInputProps) {
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
