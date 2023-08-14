import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import ChannelAdminTab from "../Tab/ChannelAdminTab";
import FullBox from "../Box/FullBox";

export interface BaseGridProps extends GridProps {
  children: React.ReactNode;
  children1: React.ReactNode;
  children2: React.ReactNode;
  children3: React.ReactNode;
}

export default function GridType3({
  children,
  children1,
  children2,
  children3,
  ...props
}: BaseGridProps) {
  return (
    <FullBox>
      <Grid
        gridTemplateRows={"repeat(16, 1fr)"}
        gridTemplateColumns={"repeat(7, 1fr)"}
        w="100%"
        h="100%"
        bg="#29292D"
        borderRadius={"6px"}
        color="white"
        fontWeight="bold"
        {...props}
      >
        <GridItem
          rowSpan={1}
          colSpan={7}
          pl={2}
          pt={0}
          borderBottom={"#414147 solid 2px"}
          bg="none"
        >
          <NavBar />
        </GridItem>
        <GridItem
          display={{ base: "flex", md: "flex" }}
          rowSpan={15}
          colSpan={5}
          bg="none"
          borderRight={"#414147 solid 2px"}
          px={5}
          py={3}
          overflowY="auto"
        >
          <Box w="100%" h="100%">
            {children}
          </Box>
        </GridItem>
        <GridItem
          display={{ base: "flex", md: "flex" }}
          rowSpan={15}
          colSpan={2}
          bg="none"
          px={3}
          py={4}
          overflowY="auto"
        >
          <ChannelAdminTab
            children1={children1}
            children2={children2}
            children3={children3}
          >
            <div>Content 1</div>
            <div>Content 2</div>
          </ChannelAdminTab>
        </GridItem>
      </Grid>
    </FullBox>
  );
}
