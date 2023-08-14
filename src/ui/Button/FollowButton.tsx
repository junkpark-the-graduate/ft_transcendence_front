import { useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { ButtonProps, Flex } from "@chakra-ui/react";
import { follow, unfollow } from "@/utils/user/follow";
import { getFollowingList } from "@/utils/user/getFollowingList";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { unblock } from "@/utils/user/block";
import { useAppContext } from "@/app/providers";

export interface FollowButtonProps extends ButtonProps {
  myId: number | undefined;
  userId: number | undefined;
  icon: boolean;
}

export default function FollowButton({
  myId,
  userId,
  icon,
  ...props
}: FollowButtonProps) {
  const { isFollowing, setIsFollowing, isBlocking, setIsBlocking } =
    useAppContext();
  const followingList = getFollowingList(myId);
  const blockingList = getBlockingList(myId);

  useEffect(() => {
    setIsFollowing(
      followingList ? followingList.includes(Number(userId)) : false
    );
  }, [followingList, blockingList, userId]);

  const handleFollow = async () => {
    await follow(myId, userId, () => setIsFollowing(true));
    if (isBlocking === true)
      await unblock(myId, userId, () => setIsBlocking(false));
  };

  const handleUnfollow = async () => {
    await unfollow(myId, userId, () => setIsFollowing(false));
  };

  return icon ? (
    <Flex>
      <BaseButton
        flex="1"
        size="sm"
        leftIcon={isFollowing ? <GoNoEntry /> : <GoPlusCircle />}
        text={isFollowing ? "unfollow" : "follow"}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        bg={isFollowing ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
        {...props}
      />
    </Flex>
  ) : (
    <Flex>
      <BaseButton
        w="85px"
        fontSize={14}
        mr={2}
        flex="1"
        size="sm"
        text={isFollowing ? "unfollow" : "follow"}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        bg={isFollowing ? "#191919" : "#414147"}
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
        {...props}
      />
    </Flex>
  );
}
