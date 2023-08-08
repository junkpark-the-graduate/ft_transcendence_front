import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import BaseButton from "../Button/Button";
import { UserData } from "@/utils/user/getUserData";
import { getMyData } from "@/utils/user/getMyData";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import BlockButton from "../Button/BlockButton";
import FollowButton from "../Button/FollowButton";
import { useRouter } from "next/navigation";
import getRankById from "@/utils/user/getRankById";

export interface ProfileModalProps {
  userData: UserData | null | undefined;
}

export default function ProfileModal({
  userData,
  ...props
}: ProfileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myData = getMyData();
  const router = useRouter();
  const rank = getRankById(userData?.id);

  return (
    <Box>
      <Box as="button" onClick={onOpen} fontSize={14}>
        {userData?.name}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          mt={40}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
          {...props}
        >
          <ModalHeader>
            <Flex>
              <Avatar size="xl" name={userData?.name} src={userData?.image} />
              <Box ml={8}>
                <Text fontSize={24} mb={2}>
                  {userData?.name}
                </Text>
                <Text fontSize={16} textColor="#A0A0A3">
                  42 id: {userData?.id}
                </Text>
                <Text fontSize={16} textColor="#A0A0A3">
                  status:{" "}
                  {userData?.status === EUserStatus.online
                    ? "online"
                    : "offline"}
                </Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            mx={4}
            py={4}
            borderTop={"#A0A0A3 1px solid"}
            borderBottom={"#A0A0A3 1px solid"}
          >
            <Center>
              <HStack spacing={3}>
                <Flex>
                  <StackItem borderRadius="8px" px={2} mx={1} bg="#191919">
                    rank: {rank}
                  </StackItem>
                  <StackItem borderRadius="8px" px={2} mx={1} bg="#191919">
                    score: {userData?.mmr}
                  </StackItem>
                  <StackItem borderRadius="8px" px={2} mx={1} bg="#191919">
                    stats: ? W ? L
                  </StackItem>
                </Flex>
              </HStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <FollowButton
              myId={myData?.id}
              userId={userData?.id}
              icon={false}
            />
            <BlockButton myId={myData?.id} userId={userData?.id} icon={false} />
            <BaseButton
              flex="1"
              mr={2}
              my={2}
              size="sm"
              fontSize={14}
              text="message"
              onClick={() => {}}
            />
            <BaseButton
              flex="1"
              fontSize={14}
              size="sm"
              text="visit"
              onClick={() => {
                router.push(`/user/profile/${userData?.id}`);
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
