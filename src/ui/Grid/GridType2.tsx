import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  GridProps,
} from "@chakra-ui/react";
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
      color="white"
      fontWeight="bold"
    >
      <GridItem
        rowSpan={1}
        colSpan={6}
        pl={2}
        pt={1}
        borderBottom={"#3B3D41 solid 2px"}
        bg="none"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <GridItem rowSpan={12} colSpan={6} bg="none" area={"main1"} p={10}>
        {children}
      </GridItem>
    </Grid>
  );
}
