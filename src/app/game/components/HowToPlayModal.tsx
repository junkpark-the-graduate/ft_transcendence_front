import GameButton from "@/ui/Button/GameButton";
import BaseHeading from "@/ui/Typo/Heading";
import {
  Box,
  Button,
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { GoLog } from "react-icons/go";

export default function HowToPlayModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <GameButton leftIcon={<GoLog />} onClick={onOpen} text="How to Play" />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent mt={40} p={4} bg="#29292D">
          <ModalHeader pt={2} pb={4} textAlign="center">
            How to Play
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody mx={4} py={6} borderTop={"#A0A0A3 1px solid"} mb={2}>
            <Box fontSize={16} fontWeight={200} textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              maximus mauris turpis, nec rutrum massa mattis vel. Sed felis
              nulla, dignissim a suscipit vel, tempor vitae risus. Proin at dui
              ut felis congue rhoncus sed nec nibh. Nam fringilla quam aliquam
              massa egestas, eu lacinia erat sodales. Morbi pharetra molestie
              enim, at posuere risus accumsan vitae. Donec interdum sem a arcu
              accumsan, sodales bibendum purus luctus. Sed pellentesque orci
              sodales blandit imperdiet. Nulla non massa pharetra, feugiat lorem
              ullamcorper, ultricies velit. Nulla non massa pharetra, feugiat
              lorem ullamcorper, ultricies velit. Nulla non massa pharetra,
              feugiat lorem ullamcorper, ultricies velit.
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
