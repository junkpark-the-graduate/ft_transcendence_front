"use client";

import { Flex } from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import BaseInput from "@/ui/Input/Input";
import BaseCard from "@/ui/Card/Card";
import BaseSwitch from "@/ui/Switch/Switch";
import BaseTabs from "@/ui/Tab/Tab";
import BaseBox from "@/ui/Box/Box";
import NavBar from "@/ui/NavBar/NavBar";
import ProfileDashboard from "@/ui/sample/dashboard";

export default function Test() {
  return (
    <ProfileDashboard />
    // <BaseBox>
    //   <Flex justifyContent="flex-end">
    //     <BaseInput placeholder="email" />
    //     <BaseButton
    //       text="submit"
    //       type="submit"
    //       onClick={() => {
    //         console.log("hello");
    //       }}
    //     />
    //   </Flex>
    //   <BaseSwitch text="2FA" />
    // </BaseBox>
  );
}
