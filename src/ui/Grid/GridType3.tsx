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
      <NavBar />
      <Grid
        gridTemplateColumns={"repeat(7, 1fr)"}
        w="full"
        h="93%"
        color="white"
        fontWeight="bold"
        gap={3}
        {...props}
      >
        <GridItem

          display={{ base: "flex", md: "flex" }}
          colSpan={5}
          rowSpan={15}
          bg="#29292D"
          px={5}
          my={2}
          py={3}
          borderRadius="8px"
        >
          <Box w="100%" h="100%">
            {children}
          </Box>
        </GridItem>
        <GridItem
          display={{ base: "flex", md: "flex" }}
          rowSpan={15}
          colSpan={2}
          bg="#29292D"
          borderRadius="8px"
          my={2}
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
