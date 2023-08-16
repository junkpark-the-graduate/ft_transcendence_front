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
  channelMembers: any[];
  setChannelMembers: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatModal: React.FC<ChatModalProps> = ({
  channelId,
  memberId,
  isOpen,
  setIsOpen,
  user,
  setBlockingUserIdList,
  channelMembers,
  setChannelMembers,
  ...props
}) => {
  const router = useRouter();
  const [memberData, setMemberData] = useState<any>(null);
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");
  const [isChannelMember, setIsChannelMember] = useState<boolean>(false);

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

    if (channelMembers) {
      //channelMembers에 memberId가 있는지 확인
      const ret = channelMembers.some((member) => member.user.id === memberId);
      setIsChannelMember(ret);
      console.log("ret", ret);
    }
  }, [memberId]);

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

    // TODO -> muted 된 유저라면 mute 버튼을 비활성화. set을 활용하고 싶은걸
    // TODO muteTime 지금 완전 짧게 되어있으니까 수정해야함!
    if (res.status < 300) {
      toast({
        title: `${memberData?.name} is muted`,
        status: "success",
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
        setIsChannelMember(false);
        setChannelMembers(channelMembers.filter((m) => m.user.id !== memberId));
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
          title: "차단에 실패하였습니다.",
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
        setIsChannelMember(false);
        setChannelMembers(channelMembers.filter((m) => m.user.id !== memberId));
      }
    }
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
                <Text fontSize={24} mb={2}>
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
          <ModalBody
            mx={4}
            py={4}
            borderTop={"#A0A0A3 1px solid"}
            borderBottom={"#A0A0A3 1px solid"}
          >
            <Center>
              <Stack>
                <ChatModalButtons
                  myId={user?.id}
                  userId={memberData?.id}
                  setBlockingUserIdList={setBlockingUserIdList}
                />
                <DmBaseButton userId={memberData?.id} icon={false} />
                <BaseButton
                  fontSize={14}
                  size="sm"
                  text="visit"
                  mr={2}
                  bg="#414147"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    router.push(`/user/profile/${memberData?.id}`);
                  }}
                />
                <BaseButton
                  fontSize={14}
                  size="sm"
                  text="invite game"
                  mr={2}
                  bg="#414147"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    console.log("해당 유저 게임초대");
                  }}
                />
                {user?.isAdmin && isChannelMember && (
                  <BaseButton
                    fontSize={14}
                    size="sm"
                    text="mute"
                    mr={2}
                    onClick={handleMute}
                    bg="#414147"
                    style={{ whiteSpace: "nowrap" }}
                  />
                )}
                {user?.isAdmin && isChannelMember && (
                  <BaseButton
                    fontSize={14}
                    size="sm"
                    text="ban"
                    mr={2}
                    onClick={handleBan}
                    bg="#414147"
                    style={{ whiteSpace: "nowrap" }}
                  />
                )}
                {user?.isAdmin && isChannelMember && (
                  <BaseButton
                    fontSize={14}
                    size="sm"
                    text="kick"
                    mr={2}
                    onClick={handleKick}
                    bg="#414147"
                    style={{ whiteSpace: "nowrap" }}
                  />
                )}
              </Stack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Text textAlign="center" w="full" fontSize={16}>
              {!isChannelMember && "채널에 없는 유저입니다"}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChatModal;
