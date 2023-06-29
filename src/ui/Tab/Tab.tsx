// example

import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  TabsProps,
} from "@chakra-ui/react";

export interface BaseTabsProps extends TabsProps {}

export default function BaseTabs({ ...props }: BaseTabsProps) {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>channels</Tab>
        <Tab>friends</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>list of friends</p>
        </TabPanel>
        <TabPanel>
          <p>list of friends</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
