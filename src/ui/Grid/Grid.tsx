"use client";
import { Grid, GridItem } from "@chakra-ui/react";
import Simple from "../NavBar/NavBar";

export default function BaseGrid() {
  return (
    <Grid
      templateAreas={`"header header"
                  "main1 main2"`}
      gridTemplateRows={"repeat(12, 1fr)"}
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
        bg="#3B3D41"
        area={"header"}
      >
        <Simple />
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={4}
        borderRadius={"15px"}
        pl="2"
        bg="#3B3D41"
        area={"main1"}
      ></GridItem>
      <GridItem
        rowSpan={11}
        colSpan={2}
        borderRadius={"15px"}
        pl="2"
        bg="#3B3D41"
        area={"main2"}
      ></GridItem>
    </Grid>
  );
}
