import { useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoCircleSlash, GoComment } from "react-icons/go";
import { Flex, useToast } from "@chakra-ui/react";
import { block, unblock } from "@/utils/user/block";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { useAppContext } from "@/app/providers";
import { createDm } from "@/utils/channel/dm";
import { useRouter } from "next/navigation";

export default function BlockButton({
  userId,
  icon,
}: {
  userId: number | undefined;
  icon: boolean;
}) {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {}, []);

  const handleConnectDm = async () => {
    const resCreateDm = await createDm(userId);
    const resCreateDmJson = await resCreateDm.json();

    if (resCreateDm.status < 300) {
      router.push(`/channel/${resCreateDmJson.id}/chat-room`);
    } else {
      toast({
        title: resCreateDmJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return icon ? (
    <Flex>
      <BaseButton
        textColor={"white"}
        flex="1"
        size="sm"
        leftIcon={<GoComment />}
        text="message"
        onClick={handleConnectDm}
        bg="#414147"
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
      />
    </Flex>
  ) : (
    <Flex>
      <BaseButton
        w="85px"
        flex="1"
        fontSize={14}
        mr={2}
        size="sm"
        text="message"
        onClick={handleConnectDm}
        bg="#414147"
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
      />
    </Flex>
  );
}
