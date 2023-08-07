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
import { getMyData } from "@/utils/user/getMyData";
import { unfollow } from "@/utils/user/follow";
import { getBlockingList } from "@/utils/user/getBlockingList";
import { block, unblock } from "@/utils/user/block";
import BaseButton from "../Button/Button";
import { GoCircleSlash } from "react-icons/go";
import { EUserStatus } from "@/app/user/types/EUserStatus";

function BlockingListItem({ myId, userId }: { myId: number; userId: number }) {
  const userData = getUserData(userId);
  const [isBlocking, setIsBlocking] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBlock = async () => {
    await block(myId, userId, () => setIsBlocking(true));
    await unfollow(myId, userId, () => setIsFollowing(false));
  };

  const handleUnblock = async () => {
    await unblock(myId, userId, () => setIsBlocking(false));
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
  const myData = getMyData();
  const myId = myData?.id ?? 0;
  const blockings = getBlockingList(myId);

  return (
    <Box>
      {blockings && blockings.length > 0 ? (
        <Stack spacing={2}>
          {blockings.map((blockings, index, array) => (
            <React.Fragment key={blockings}>
              <BlockingListItem myId={myId} userId={Number(blockings)} />
              {index !== array.length - 1 && <Divider borderColor="#414147" />}
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Center>
          <Text fontSize="16px" fontWeight="bold" color="gray" mb={2}>
            empty
          </Text>
        </Center>
      )}
    </Box>
  );
}
