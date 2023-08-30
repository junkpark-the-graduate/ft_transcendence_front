import { Box, Flex, Avatar, Text, GridItem, Grid } from "@chakra-ui/react";
import LinkButton from "@/ui/Button/LinkButton";
import { GoPencil, GoSignOut } from "react-icons/go";
import BaseButton from "@/ui/Button/Button";
import { EUserStatus } from "../../app/user/types/EUserStatus";
import BlockedUsersModal from "@/app/user/components/BlockedUsersModal";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth/logout";
import { useUserDataContext } from "@/context/UserDataContext";

export default function MyDetail() {
  const router = useRouter();
  const { myData } = useUserDataContext();

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
              border="white 5px solid"
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
                icon={<GoPencil />}
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
                  logout();
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
