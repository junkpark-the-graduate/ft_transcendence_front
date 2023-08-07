"use client";

import BaseButton from "@/ui/Button/Button";
import BlockingList from "@/ui/Lists/BlockingList";
import BaseHeading from "@/ui/Typo/Heading";
import { Box, Center, Divider, Flex, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BlockedUsers() {
  const router = useRouter();

  return (
    <Center>
      <Box bg="#29292D" w="500px" p="40px 60px" borderRadius={"15px"}>
        <BaseHeading text="blocked users" />
        <Divider mt={3} mb={5} />
        <BlockingList />
        <Divider mt={3} mb={5} />
        <Flex>
          <Spacer />
          <BaseButton
            text="돌아가기"
            mr={2}
            onClick={() => {
              router.push(`/user/profile`);
            }}
          />
        </Flex>
      </Box>
    </Center>
  );
}
