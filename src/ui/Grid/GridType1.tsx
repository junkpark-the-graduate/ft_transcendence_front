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
}

export default function GridType1({ children, ...props }: BaseGridProps) {
  const [joinedChannels, setJoinedChannels] = useState<any>([]);

  useEffect(() => {
    getJoinedChannels(setJoinedChannels);
  }, []);

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
        >
          <BaseTabs
            children1={<FollowingList />}
            children2={
              <JoinedChannelList
                joinedChannels={joinedChannels}
                setJoinedChannels={setJoinedChannels}
              />
            }
          >
            <div>Content 1</div>
            <div>Content 2</div>
          </BaseTabs>
        </GridItem>
      </Grid>
    </FullBox>
  );
}
