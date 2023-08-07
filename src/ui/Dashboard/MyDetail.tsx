import { Box, Flex, Avatar, Text, GridItem, Grid } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { GoGear, GoTrash } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import { getMyData } from "@/utils/user/getMyData";
import { EUserStatus } from "../../app/user/types/EUserStatus";
import BlockedUsersModal from "@/app/user/components/BlockedUsersModal";

export default function MyDetail() {
  const myData = getMyData();

  return (
    <Box position="relative" px={5} pt={4} borderRadius={8} mb={2}>
      <Box>
        <Grid
          gridTemplateRows={"repeat(1, 1fr)"}
          gridTemplateColumns={"repeat(4, 1fr)"}
        >
          <GridItem colSpan={1}>
            <Avatar
              ml={4}
              mt={4}
              size="2xl"
              name={myData?.name}
              src={myData?.image}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={28} mb={2}>
              {myData?.name}
            </Text>
            <Text fontSize={16}>42 ID: {myData?.id}</Text>
            <Text fontSize={16}>email: {myData?.email}</Text>
            <Text fontSize={16}>
              TFA enable: {myData?.twoFactorEnabled ? "true" : "false"}
            </Text>
            <Text fontSize={16}>
              status:{" "}
              {myData?.status === EUserStatus.online ? "online" : "offline"}
            </Text>
          </GridItem>
          <GridItem colSpan={1} pt={6}>
            <Flex flexDirection={"column"}>
              <LinkButton
                icon={<GoGear />}
                text="edit profile"
                goTo="/user/edit"
              />
              <BlockedUsersModal />
              <BaseButton
                my={1}
                size="sm"
                textColor={"red"}
                text="delete account"
                leftIcon={<GoTrash />}
                onClick={() => {}}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
