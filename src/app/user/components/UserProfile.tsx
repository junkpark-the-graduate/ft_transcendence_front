import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import TestDashboard from "./Dashboard";
import User from "./User";

export default function ProfileGrid() {
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
        pt={0.5}
      >
        {/* <NavBar /> */}
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={6}
        borderRadius={"15px"}
        pl="2"
        bg="#29292D"
        area={"main1"}
        p={5}
      >
        <User />

        {/* <TestDashboard /> */}
      </GridItem>
    </Grid>
  );
}
