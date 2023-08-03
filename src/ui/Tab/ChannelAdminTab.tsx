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
  children3: React.ReactNode;
}

export default function BaseTabs({
  children1,
  children2,
  children3,
  ...props
}: BaseTabsProps) {
  return (
    <Tabs variant="unstyled" w="100%" isFitted>
      <TabList w="100%" mx="auto">
        <Tab
          borderRadius={"6px"}
          mx={1}
          opacity={"30%"}
          bg="#414147"
          textColor={"white"}
          _selected={{
            fontWeight: "800",
            opacity: "100%",
          }}
          fontSize={14}
        >
          members
        </Tab>
        <Tab
          borderRadius={"6px"}
          mx={1}
          opacity={"30%"}
          bg="#414147"
          textColor={"white"}
          _selected={{
            fontWeight: "800",
            opacity: "100%",
          }}
          fontSize={14}
        >
          banned
        </Tab>
        <Tab
          borderRadius={"6px"}
          mx={1}
          opacity={"30%"}
          bg="#414147"
          textColor={"white"}
          _selected={{
            fontWeight: "800",
            opacity: "100%",
          }}
          fontSize={14}
        >
          invite
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{children1}</TabPanel>
        <TabPanel>{children2}</TabPanel>
        <TabPanel>{children3}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
