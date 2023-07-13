import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  TabsProps,
} from "@chakra-ui/react";

export interface BaseTabsProps extends TabsProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
}

export default function BaseTabs({
  children1,
  children2,
  ...props
}: BaseTabsProps) {
  return (
    <Tabs variant="enclosed" w="100%">
      <TabList w="100%" mx="auto">
        <Tab
          textColor="#949494"
          _selected={{ fontWeight: "800", textColor: "white" }}
          mx="auto"
        >
          channels
        </Tab>
        <Tab
          mx="auto"
          textColor="#949494"
          _selected={{ fontWeight: "800", textColor: "white" }}
        >
          friends
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{children1}</TabPanel>
        <TabPanel>{children2}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
