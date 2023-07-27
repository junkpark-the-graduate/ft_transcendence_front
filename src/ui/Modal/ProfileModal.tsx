import {
  Avatar,
  Box,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import BaseButton from "../Button/Button";
import { UserData } from "@/utils/user/getUserData";
import { getMyData } from "@/utils/user/getMyData";
import { EUserStatus } from "@/app/user/types/EUserStatus";

export interface ProfileModalProps {
  userData: UserData | null | undefined;
}

export default function ProfileModal({
  userData,
  ...props
}: ProfileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myData = getMyData();

  return (
    <Box>
      <Box as="button" onClick={onOpen} fontSize={14}>
        {userData?.name}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={4} bg="#29292D" {...props}>
          <ModalHeader>
            <Flex>
              <Avatar size="xl" name={userData?.name} src={userData?.image} />
              <Box ml={8}>
                <Text fontSize={24} mb={2}>
                  {userData?.name}
                </Text>
                <Text fontSize={16}>42 id: {userData?.id}</Text>
                <Text fontSize={16}>
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
              <Text px={2} mx={1} bg="gray">
                user rank
              </Text>
              <Text px={2} mx={1} bg="gray">
                user score
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <BaseButton
              mr={2}
              my={2}
              flex={1}
              size="sm"
              text="follow"
              onClick={() => {}}
            />
            <BaseButton
              mr={2}
              my={2}
              flex={1}
              size="sm"
              text="block"
              onClick={() => {}}
            />
            <BaseButton
              mr={2}
              my={2}
              flex={1}
              size="sm"
              text="dm"
              onClick={() => {}}
            />
            <BaseButton
              my={2}
              flex={1}
              size="sm"
              text="detail"
              onClick={() => {}}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
