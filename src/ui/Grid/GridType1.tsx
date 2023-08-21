import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import FullBox from "../Box/FullBox";

export interface GridType1Props extends GridProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

export default function GridType1({
  children,
  side,
  ...props
}: GridType1Props) {
  return (
    <FullBox>
      <NavBar />
      <Grid
        gridTemplateColumns={"repeat(7, 1fr)"}
        w="full"
        h="93%"
        color="white"
        fontWeight="bold"
        gap={3}
        {...props}
      >
        <GridItem
          display={{ base: "flex", md: "flex" }}
          colSpan={5}
          bg="#29292D"
          px={5}
          my={2}
          py={3}
          borderRadius="8px"
          // overflowY="auto"
        >
          <Box w="100%" h="100%">
            {children}
          </Box>
        </GridItem>
        <GridItem
          display={{ base: "flex", md: "flex" }}
          colSpan={2}
          bg="#29292D"
          borderRadius="8px"
          my={2}
          px={3}
          py={4}
        >
          {side}
        </GridItem>
      </Grid>
    </FullBox>
  );
}
