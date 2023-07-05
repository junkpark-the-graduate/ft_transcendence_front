import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";

export interface BaseGridProps extends GridProps {}

export default function GridType2({ children, ...props }: BaseGridProps) {
  return (
    <Grid
      templateAreas={`"header header"
                  "main1 main2"`}
      gridTemplateRows={"repeat(13, 1fr)"}
      gridTemplateColumns={"repeat(6, 1fr)"}
      h="750px"
      bg="#29292D"
      borderRadius={"8px"}
      // border={"white solid 1px"}
      color="white"
      fontWeight="bold"
    >
      <GridItem
        rowSpan={1}
        colSpan={6}
        pl={2}
        pt={1}
        borderBottom={"white solid 1px"}
        bg="none"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={6}
        bg="none"
        area={"main1"}
        px={10}
        py={5}
      >
        {children}
      </GridItem>
    </Grid>
  );
}
