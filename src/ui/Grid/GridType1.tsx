import { Divider, Grid, GridItem, GridProps } from "@chakra-ui/react";
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
      bg="#29292D"
      // bg="none"
      // border={"white solid 1px"}
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
        borderBottom={"white solid 1px"}
        bg="none"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <GridItem
        display={{ base: "flex", md: "flex" }}
        rowSpan={12}
        colSpan={4}
        bg="none"
        borderRight={"white solid 1px"}
        area={"main1"}
        px={5}
        py={3}
      >
        {children1}
      </GridItem>
      <GridItem
        display={{ base: "flex", md: "flex" }}
        rowSpan={12}
        colSpan={2}
        bg="none"
        area={"main2"}
        px={5}
        py={3}
      >
        {children2}
      </GridItem>
    </Grid>
  );
}
