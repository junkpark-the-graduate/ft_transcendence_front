import { useEffect } from "react";
import BaseButton from "@/ui/Button/Button";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { ButtonProps, Flex } from "@chakra-ui/react";
import { follow, unfollow } from "@/utils/user/follow";
import { unblock } from "@/utils/user/block";
import { useRelationContext } from "@/context/RelationContext";

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
  const {
    isFollowing,
    setIsFollowing,
    isBlocking,
    setIsBlocking,
    followingList,
    setFollowingList,
    blockingList,
    setBlockingList,
  } = useRelationContext();

  useEffect(() => {
    setIsFollowing(
      followingList ? followingList.includes(Number(userId)) : false
    );
  }, [followingList, blockingList, userId]);

  const handleFollow = async () => {
    await follow(userId, () => setIsFollowing(true));
    if (isBlocking === true) {
      await unblock(userId, () => setIsBlocking(false));
    }
    if (followingList && !followingList.includes(Number(userId))) {
      setFollowingList([...followingList, Number(userId)]);
    }
    setBlockingList((prevList) =>
      prevList ? prevList.filter((id) => id !== Number(userId)) : []
    );
  };

  const handleUnfollow = async () => {
    await unfollow(userId, () => setIsFollowing(false));
    if (followingList && followingList.includes(Number(userId))) {
      setFollowingList(followingList.filter((id) => id !== Number(userId)));
    }
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
