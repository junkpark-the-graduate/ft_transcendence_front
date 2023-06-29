import { Grid, GridItem, GridProps } from "@chakra-ui/react";
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
      templateAreas={`"header header"
                  "main1 main2"`}
      gridTemplateRows={"repeat(13, 1fr)"}
      gridTemplateColumns={"repeat(6, 1fr)"}
      h="750px"
      gap="2.5"
      color="white"
      fontWeight="bold"
      {...props}
    >
      <GridItem
        rowSpan={1}
        colSpan={6}
        borderRadius={"15px"}
        pl="2"
        bg="#29292D"
        area={"header"}
        pt={0.5}
      >
        <NavBar />
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={4}
        borderRadius={"15px"}
        bg="#29292D"
        area={"main1"}
        px={5}
        py={3}
      >
        {children1}
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={2}
        borderRadius={"15px"}
        bg="#29292D"
        area={"main2"}
        px={5}
        py={3}
      >
        {children2}
      </GridItem>
    </Grid>
  );
}
