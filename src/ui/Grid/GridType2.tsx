import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import FullBox from "../Box/FullBox";

export interface BaseGridProps extends GridProps {}

export default function GridType2({ children, ...props }: BaseGridProps) {
  return (
    <FullBox>
      <NavBar />
      <Grid
        gridTemplateColumns={"repeat(3, 1fr)"}
        w="full"
        h="96%"
        bg="#29292D"
        borderBottomRadius={"8px"}
        color="white"
        fontWeight="bold"
        borderTop={"#414147 solid 2px"}
        {...props}
      >
        <GridItem
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
