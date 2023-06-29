import { Box, BoxProps } from "@chakra-ui/react";

export interface BaseBoxProps extends BoxProps {}

export default function BaseBox({ children, ...props }: BaseBoxProps) {
  return (
    <Box bg="#29292D" p="40px 60px" borderRadius={"15px"}>
      {children}
    </Box>
  );
}
