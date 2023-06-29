"use client";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";

export default function BaseGrid() {
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
    >
      <GridItem
        rowSpan={1}
        colSpan={6}
        borderRadius={"15px"}
        pl="2"
        bg="#29292D"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={4}
        borderRadius={"15px"}
        pl="2"
        bg="#29292D"
        area={"main1"}
      ></GridItem>
      <GridItem
        rowSpan={12}
        colSpan={2}
        borderRadius={"15px"}
        pl="2"
        bg="#29292D"
        area={"main2"}
      ></GridItem>
    </Grid>
  );
}
