import { Box, Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import BaseTabs from "../Tab/Tab";
import ChannelList from "../Lists/DummyChannelList";
import FollowingList from "../Lists/FollowingList";
import FullBox from "../Box/FullBox";
import { useEffect, useState } from "react";
import { getJoinedChannels } from "@/utils/channel/getJoinedChannels";
import JoinedChannelList from "@/ui/Lists/JoinedChannelList";

export interface BaseGridProps extends GridProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

export default function GridType1({ children, side, ...props }: BaseGridProps) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(
    () => localStorage.getItem("isChatOpen") === "true" // Parse the value from localStorage as boolean
  );

  return (
    <FullBox>
      <NavBar setIsChatOpen={setIsChatOpen} />
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
          colSpan={isChatOpen ? 5 : 7}
          bg="#29292D"
          px={5}
          my={2}
          py={3}
          borderRadius="8px"
          overflowY="auto"
        >
          <Box w="100%" h="100%">
            {children}
          </Box>
        </GridItem>
        {isChatOpen ? (
          <GridItem
            display={{ base: "flex", md: "flex" }}
            colSpan={2}
            bg="#29292D"
            borderRadius="8px"
            my={2}
            px={3}
            py={4}
          >
            {side}
          </GridItem>
        ) : (
          <></>
        )}
      </Grid>
    </FullBox>
  );
}
