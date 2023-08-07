import {
  Avatar,
  Box,
  Flex,
  HStack,
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
import { ChannelData } from "../Lists/DummyChannelList";

export interface ChannelModalProps {
  channelData: ChannelData;
}

export default function ChannelModal({
  channelData,
  ...props
}: ChannelModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box as="button" onClick={onOpen} fontSize={14}>
        {channelData.name}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} p={4} bg="#29292D" {...props}>
          <ModalHeader>
            <Flex>
              <Avatar mt={2} size="lg" name={channelData.name} />
              <Box ml={8}>
                <Text fontSize={24}>{channelData.name}</Text>
                <Text fontSize={14} textColor="#A0A0A3">
                  admin: asdf
                </Text>
                <Text fontSize={14} textColor="#A0A0A3">
                  type: public
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
            <HStack spacing={3}>
              <Flex
                align="center"
                direction="column"
                bg="#414147"
                py={2}
                px={3}
                mr={1}
                borderRadius={8}
              >
                <Avatar size="md" name="aaa" />
                <Text mt={1}>★ aaa</Text>
              </Flex>
              <Flex align="center" direction="column" py={2}>
                <Avatar size="md" name="bbb" />
                <Text mt={1}>bbb</Text>
              </Flex>
              <Flex align="center" direction="column" py={2}>
                <Avatar size="md" name="ccc" />
                <Text mt={1}>ccc</Text>
              </Flex>
              <Flex align="center" direction="column" py={2}>
                <Avatar size="md" name="ddd" />
                <Text mt={1}>ddd</Text>
              </Flex>
              <Flex align="center" direction="column" py={2}>
                <Avatar size="md" name="eee" />
                <Text mt={1}>eee</Text>
              </Flex>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <BaseButton
              flex="1"
              mr={2}
              my={2}
              size="sm"
              fontSize={14}
              text="chat"
              onClick={() => {}}
            />
            <BaseButton
              flex="1"
              fontSize={14}
              mr={2}
              my={2}
              size="sm"
              text="setting"
              onClick={() => {}}
            />
            <BaseButton
              textColor="red"
              flex="1"
              my={2}
              size="sm"
              fontSize={14}
              text="leave"
              onClick={() => {}}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
