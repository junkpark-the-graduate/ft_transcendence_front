import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";

export interface BaseGridProps extends GridProps {}

export default function GridType2({ children, ...props }: BaseGridProps) {
  return (
    <Grid
      gridTemplateRows={"repeat(15, 1fr)"}
      gridTemplateColumns={"repeat(6, 1fr)"}
      bg="#29292D"
      borderRadius={"8px"}
      color="white"
      fontWeight="bold"
      w="100%"
      h="100%"
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
      <GridItem rowSpan={14} colSpan={6} bg="none" px={10} py={5}>
        {children}
      </GridItem>
    </Grid>
  );
}
