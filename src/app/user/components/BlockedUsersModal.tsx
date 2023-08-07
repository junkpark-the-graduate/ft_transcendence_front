import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BlockingList from "@/ui/Lists/BlockingList";
import BaseButton from "@/ui/Button/Button";
import { GoCircleSlash } from "react-icons/go";
import BaseHeading from "@/ui/Typo/Heading";

export default function BlockedUsersModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <BaseButton
        my={1}
        w="full"
        size="sm"
        text="blocked users"
        leftIcon={<GoCircleSlash />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={4} bg="#29292D">
          <ModalHeader>
            <BaseHeading text="blocked users" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            mx={4}
            py={4}
            borderTop={"#A0A0A3 1px solid"}
            borderBottom={"#A0A0A3 1px solid"}
          >
            <BlockingList />
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
