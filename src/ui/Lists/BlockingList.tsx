import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getUserData } from "@/utils/user/getUserData";
import { unfollow } from "@/utils/user/follow";
import { block, unblock } from "@/utils/user/block";
import BaseButton from "../Button/Button";
import { GoCircleSlash } from "react-icons/go";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { useRelationContext } from "@/context/RelationContext";

function BlockingListItem({ userId }: { userId: number }) {
  const userData = getUserData(userId);
  const [isBlocking, setIsBlocking] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { blockingList, setBlockingList } = useRelationContext();

  const handleBlock = async () => {
    await block(userId, () => setIsBlocking(true));
    await unfollow(userId, () => setIsFollowing(false));
    if (blockingList) {
      setBlockingList([...blockingList, userId]);
    } else {
      setBlockingList([userId]);
    }
  };

  const handleUnblock = async () => {
    await unblock(userId, () => setIsBlocking(false));
    if (blockingList) {
      setBlockingList(blockingList.filter((id) => id !== userId));
    }
  };

  return (
    <Flex align="center" my={1}>
      <Avatar size="sm" name={userData?.name} mr={6}>
        <AvatarBadge
          bg={userData?.status === EUserStatus.online ? "green" : "red"}
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
      <Text fontSize={14}>{userData?.name}</Text>
      <Spacer />
      <Flex>
        <BaseButton
          textColor={"red"}
          flex="1"
          size="sm"
          leftIcon={isBlocking ? <GoCircleSlash /> : <GoCircleSlash />}
          text={isBlocking ? "unblock" : "block"}
          onClick={isBlocking ? handleUnblock : handleBlock}
          bg={isBlocking ? "#191919" : "#414147"}
        />
      </Flex>
    </Flex>
  );
}

export default function BlockingList() {
  const { blockingList } = useRelationContext();

  return (
    <Box>
      {blockingList && blockingList.length > 0 ? (
        <Stack spacing={2}>
          {blockingList.map((blockedUser, index, array) => (
            <React.Fragment key={blockedUser}>
              <BlockingListItem userId={Number(blockedUser)} />
              {index !== array.length - 1 && <Divider borderColor="#414147" />}
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Center>
          <Text fontSize="16px" fontWeight="bold" color="gray">
            empty
          </Text>
        </Center>
      )}
    </Box>
  );
}
