import { Box, BoxProps } from "@chakra-ui/react";

export interface BaseBoxProps extends BoxProps {}

export default function BaseBox({ children, ...props }: BaseBoxProps) {
  return (
    <Box
      bg="none"
      borderRadius={"8px"}
      border={"white solid 1px"}
      p="40px 60px"
    >
      {children}
    </Box>
  );
}
