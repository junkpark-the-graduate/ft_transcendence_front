import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import FullBox from "../Box/FullBox";

export interface BaseGridProps extends GridProps {}

export default function GridType2({ children, ...props }: BaseGridProps) {
  return (
    <FullBox>
      <Grid
        gridTemplateRows={"repeat(16, 1fr)"}
        gridTemplateColumns={"repeat(3, 1fr)"}
        bg="#29292D"
        borderRadius={"8px"}
        color="white"
        fontWeight="bold"
        w="100%"
        h="100%"
      >
        <GridItem
          rowSpan={1}
          colSpan={3}
          pl={2}
          pt={0}
          borderBottom={"#414147 solid 2px"}
          bg="none"
        >
          <NavBar />
        </GridItem>
        <GridItem rowSpan={15} colSpan={3} bg="none" px={10} py={5}>
          {children}
        </GridItem>
      </Grid>
    </FullBox>
  );
}
