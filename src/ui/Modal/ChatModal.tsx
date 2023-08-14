import {
  Avatar,
  Box,
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
import { UserData } from "@/utils/user/getUserData";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import BlockButton from "../Button/BlockButton";
import FollowButton from "../Button/FollowButton";
import { useRouter } from "next/navigation";
import DmBaseButton from "../Button/DmBaseButton";
import { useEffect, useState } from "react";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";
import Cookies from "js-cookie";

interface ChatModalProps {
  channelId: number;
  memberId: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user?: any;
}

const ChatModal: React.FC<ChatModalProps> = ({
  channelId,
  memberId,
  isOpen,
  setIsOpen,
  user,
  ...props
}) => {
  const router = useRouter();
  const [rank, setRank] = useState(0);
  const [userData, setUserData] = useState<UserData | null | undefined>(null);
  const [myData, setMyData] = useState<UserData | null | undefined>(null);
  const toast = useToast();
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (!memberId) return;

    fetchAsyncToBackEnd(`/user/${memberId}`).then((res: any) => {
      res.json().then((data: any) => {
        setUserData(data);
      });
    });

    fetchAsyncToBackEnd(`/user/ranking/${memberId}`).then((res: any) => {
      res.json().then((data: any) => {
        setRank(data.rank);
      });
    });
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
        title: `${userData?.name} is muted`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  console.log("user", user);

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
              <Stack>
                <FollowButton
                  myId={myData?.id}
                  userId={userData?.id}
                  icon={false}
                />
                <BlockButton
                  myId={myData?.id}
                  userId={userData?.id}
                  icon={false}
                />
                <DmBaseButton userId={userData?.id} icon={false} />
                <BaseButton
                  fontSize={14}
                  size="sm"
                  text="visit"
                  mr={2}
                  bg="#414147"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    router.push(`/user/profile/${userData?.id}`);
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
                {user?.isAdmin && (
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
              </Stack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChatModal;
