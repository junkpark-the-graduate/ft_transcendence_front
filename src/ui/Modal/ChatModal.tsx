import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import BaseButton from "../Button/Button";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { useRouter } from "next/navigation";
import DmBaseButton from "../Button/DmBaseButton";
import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import Cookies from "js-cookie";
import ChatModalButtons from "../Button/ChatModalButtons";
import { socket } from "@/app/game/socket";

interface IBlockingUserId {
  blockingId: number;
}

interface ChatModalProps {
  channelId: number;
  memberId: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user?: any;
  setBlockingUserIdList: React.Dispatch<
    React.SetStateAction<IBlockingUserId[]>
  >;
  connectedMembers: any[];
  setInviteGameRoomId: React.Dispatch<React.SetStateAction<string>>;
}

const ChatModal: React.FC<ChatModalProps> = ({
  channelId,
  memberId,
  isOpen,
  setIsOpen,
  user,
  setBlockingUserIdList,
  connectedMembers,
  setInviteGameRoomId,
  ...props
}) => {
  const router = useRouter();
  const [memberData, setMemberData] = useState<any>(null);
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");
  const [isConnectedMember, setIsConnectedMember] = useState<boolean>(false);

  async function getUserData(userId: number) {
    const res = await fetchAsyncToBackEnd(`/user/${userId}`);
    const resJson = await res.json();
    return resJson;
  }

  useEffect(() => {
    if (!memberId) return;
    getUserData(memberId).then((res) => {
      setMemberData(res);
    });

    const ret = connectedMembers.some((member) => member.id === memberId);
    setIsConnectedMember(ret);
  }, [memberId, isOpen]);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleMute = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/muted-member?memberId=${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();

    // TODO muteTime 지금 완전 짧게 되어있으니까 수정해야함!
    if (res.status < 300) {
      toast({
        title: `${memberData?.name}가 mute 되었습니다.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${memberData?.name}를 mute할 수 없습니다.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleBan = async () => {
    if (confirm(`정말로 ${memberData.name} 유저를 차단하시겠습니까?`)) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member?memberId=${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const resJson = await res.json();

      if (res.status > 299) {
        toast({
          title: "차단에 실패하였습니다.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${memberData.name} 유저가 차단되었습니다.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsConnectedMember(false);
      }
    }
  };

  const handleKick = async () => {
    if (confirm(`정말로 ${memberData.name} 유저를 쫓아내겠습니까?`)) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/kicked-member?memberId=${memberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const resJson = await res.json();

      if (res.status > 299) {
        toast({
          title: `${memberData.name} 유저를 채널에서 쫓아낼 수 없습니다.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `${memberData.name} 유저를 채널에서 쫓아냈습니다.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsConnectedMember(false);
      }
    }
  };

  const handleGameInvite = () => {
    socket.emit("create_room", (roomId: any) => {
      setInviteGameRoomId(roomId);
      router.push(`/game/join?roomId=${roomId}`);
    });
  };

  return (
    <Box>
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
              <Avatar
                size="xl"
                name={memberData?.name}
                src={memberData?.image}
              />
              <Box ml={8}>
                <Text
                  as="button"
                  fontSize={24}
                  mb={2}
                  onClick={() => {
                    router.push(`/user/profile/${memberData?.id}`);
                  }}
                >
                  {memberData?.name}
                </Text>
                <Text fontSize={16} textColor="#A0A0A3">
                  42 id: {memberData?.id}
                </Text>
                <Text fontSize={16} textColor="#A0A0A3">
                  status:{" "}
                  {memberData?.status === EUserStatus.online
                    ? "online"
                    : "offline"}
                </Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4} py={4} borderTop={"#A0A0A3 1px solid"}>
            <Center>
              <Stack gap={2}>
                <Flex gap={2}>
                  <ChatModalButtons
                    myId={user?.id}
                    userId={memberData?.id}
                    setBlockingUserIdList={setBlockingUserIdList}
                  />
                  <DmBaseButton w="85px" userId={memberData?.id} icon={false} />
                  <BaseButton
                    w="85px"
                    isDisabled={!isConnectedMember}
                    flex="1"
                    size="sm"
                    text="invite"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={handleGameInvite}
                  />
                </Flex>
                <Flex gap={2}>
                  <Button
                    as={Box}
                    bg="teal"
                    textColor="white"
                    size="sm"
                    flex={1}
                    w="85px"
                    borderRadius={"8px"}
                    fontSize={15}
                    px="25px"
                    fontWeight={800}
                    _hover={{ bg: "teal" }}
                    _focus={{ bg: "teal" }}
                  >
                    admin
                  </Button>
                  {user?.isAdmin && (
                    <BaseButton
                      isDisabled={!isConnectedMember}
                      w="85px"
                      size="sm"
                      text="mute"
                      flex={1}
                      onClick={handleMute}
                    />
                  )}
                  {user?.isAdmin && (
                    <BaseButton
                      isDisabled={!isConnectedMember}
                      w="85px"
                      size="sm"
                      text="ban"
                      flex={1}
                      onClick={handleBan}
                    />
                  )}
                  {user?.isAdmin && (
                    <BaseButton
                      isDisabled={!isConnectedMember}
                      w="85px"
                      size="sm"
                      text="kick"
                      flex={1}
                      onClick={handleKick}
                    />
                  )}
                </Flex>
              </Stack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChatModal;
