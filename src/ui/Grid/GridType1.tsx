import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";

export interface BaseGridProps extends GridProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
}

export default function GridType1({
  children1,
  children2,
  ...props
}: BaseGridProps) {
  return (
    <Grid
      gridTemplateRows={"repeat(15, 1fr)"}
      gridTemplateColumns={"repeat(6, 1fr)"}
      w="100%"
      h="100%"
      bg="#29292D"
      borderRadius={"6px"}
      color="white"
      fontWeight="bold"
      {...props}
    >
      <GridItem
        rowSpan={1}
        colSpan={6}
        pl={2}
        pt={1}
        borderBottom={"#3B3D41 solid 2px"}
        bg="none"
      >
        <NavBar />
      </GridItem>
      <GridItem
        display={{ base: "flex", md: "flex" }}
        rowSpan={14}
        colSpan={4}
        bg="none"
        borderRight={"#3B3D41 solid 2px"}
        px={5}
        py={3}
      >
        <Box w="100%" h="100%">
          {children1}
        </Box>
      </GridItem>
      <GridItem
        display={{ base: "flex", md: "flex" }}
        rowSpan={14}
        colSpan={2}
        bg="none"
        px={5}
        py={5}
      >
        {children2}
      </GridItem>
    </Grid>
  );
}
