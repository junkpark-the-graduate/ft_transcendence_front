import { Box, BoxProps } from "@chakra-ui/react";

export interface FullBoxProps extends BoxProps {
  children: React.ReactNode;
}

export default function FullBox({ children, ...props }: FullBoxProps) {
  return (
    <Box bg="none" w="100%" h="100%" px="50px" py="40px">
      {children}
    </Box>
  );
}
