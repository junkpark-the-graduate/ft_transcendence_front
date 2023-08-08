import { Box, Flex, Avatar, Text, GridItem, Grid } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { GoGear, GoSignOut } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import { EUserStatus } from "../../app/user/types/EUserStatus";
import BlockedUsersModal from "@/app/user/components/BlockedUsersModal";
import { UserData } from "./Dashboard";
import { useRouter } from "next/navigation";

export default function MyDetail({ userData }: { userData: UserData }) {
  const router = useRouter();

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
              name={userData?.name}
              src={userData?.image}
              border="white 5px solid"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize={28} mb={2}>
              {userData?.name}
            </Text>
            <Text fontSize={16}>42 ID: {userData?.id}</Text>
            <Text fontSize={16}>email: {userData?.email}</Text>
            <Text fontSize={16}>
              TFA enable: {userData?.twoFactorEnabled ? "true" : "false"}
            </Text>
            <Text fontSize={16}>
              status:{" "}
              {userData?.status === EUserStatus.online ? "online" : "offline"}
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
                text="logout pong"
                leftIcon={<GoSignOut />}
                onClick={() => {
                  router.push(`/`);
                }}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
