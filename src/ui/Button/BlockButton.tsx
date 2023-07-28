import { useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoCircleSlash } from "react-icons/go";
import { Flex } from "@chakra-ui/react";
import { block, unblock } from "@/utils/user/block";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { useAppContext } from "@/app/providers";

export default function BlockButton({
  myId,
  userId,
  icon,
}: {
  myId: number | undefined;
  userId: number | undefined;
  icon: boolean;
}) {
  const { isFollowing, setIsFollowing, isBlocking, setIsBlocking } =
    useAppContext();
  const followingList = getFollowingList(myId);
  const blockingList = getBlockingList(myId);

  useEffect(() => {
    setIsBlocking(blockingList ? blockingList.includes(Number(userId)) : false);
  }, [followingList, blockingList, userId]);

  const handleBlock = async () => {
    await block(myId, userId, () => setIsBlocking(true));
    await unfollow(myId, userId, () => setIsFollowing(false));
  };

  const handleUnblock = async () => {
    await unblock(myId, userId, () => setIsBlocking(false));
  };

  return icon ? (
    <Flex>
      <BaseButton
        textColor={"red"}
        flex="1"
        size="sm"
        leftIcon={isBlocking ? <GoCircleSlash /> : <GoCircleSlash />}
        text={isBlocking ? "unblock" : "block"}
        onClick={isBlocking ? handleUnblock : handleBlock}
        bg={isBlocking ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
      />
    </Flex>
  ) : (
    <Flex>
      <BaseButton
        w="90px"
        flex="1"
        fontSize={14}
        mr={2}
        size="sm"
        text={isBlocking ? "unblock" : "block"}
        onClick={isBlocking ? handleUnblock : handleBlock}
        bg={isBlocking ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
      />
    </Flex>
  );
}
