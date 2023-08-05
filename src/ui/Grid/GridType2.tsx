import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import FullBox from "../Box/FullBox";
import { useState } from "react";

export interface GridType2Props extends GridProps {
  children: React.ReactNode;
}

export default function GridType2({ children, ...props }: GridType2Props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(
    () => localStorage.getItem("isSideBarOpen") === "true" // Parse the value from localStorage as boolean
  );

  return (
    <FullBox>
      <NavBar setIsSideBarOpen={setIsSideBarOpen} />
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
        <GridItem rowSpan={15} colSpan={3} bg="none" px={10} py={5}>
          {children}
        </GridItem>
      </Grid>
    </FullBox>
  );
}
