import { Box, BoxProps } from "@chakra-ui/react";

export interface ButtonBoxProps extends BoxProps {
  children: React.ReactNode;
}

export default function ButtonBox({ children, ...props }: ButtonBoxProps) {
  return (
    <Box
      as="button"
      px={6}
      py={3}
      borderRadius="8px"
      bg="#414147"
      _hover={{
        background: "#191919",
      }}
      _focus={{
        background: "#191919",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
