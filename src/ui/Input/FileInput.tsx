import { Input, InputProps } from "@chakra-ui/react";

export interface FileInputProps extends InputProps {}

export default function FileInput({ ...props }: FileInputProps) {
  return (
    <Input
      type="file"
      borderRadius="8px"
      border="none"
      bg="#414147"
      pt="5px"
      _hover={{
        background: "#191919",
      }}
      _focus={{
        background: "#191919",
        borderColor: "#191919",
      }}
      {...props}
    />
  );
}
