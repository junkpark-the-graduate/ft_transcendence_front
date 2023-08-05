import { Box, BoxProps } from "@chakra-ui/react";

export interface FullBoxProps extends BoxProps {
  children: React.ReactNode;
}

export default function FullBox({ children, ...props }: FullBoxProps) {
  return (
    <Box textColor="white" w="100%" h="100%" px="20px" py="10px" {...props}>
      {children}
    </Box>
  );
}
