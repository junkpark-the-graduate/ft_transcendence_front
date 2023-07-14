"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import {
  SmallCloseIcon,
  DeleteIcon,
  LockIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import Cookies from "js-cookie";

interface ChatProps {
  channelId: number;
}

const ChannelAdmin: React.FC<ChatProps> = ({ channelId }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [mutedMembers, setMutedMembers] = useState<any[]>([]);
  const [bannedMembers, setBannedMembers] = useState<any[]>([]);
  const accessToken = Cookies.get("accessToken");
  const toast = useToast();
  const router = useRouter();

  async function getMemberList() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/member`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setMembers(await res.json());
  }

  async function getMutedMemberList() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/muted-member`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setMutedMembers(await res.json());
  }

  async function getBannedMemberList() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setBannedMembers(await res.json());
  }

  useEffect(() => {
    getMemberList();
    getMutedMemberList();
    getBannedMemberList();
  }, [channelId]);

  async function deleteBannedMemeber(channelId: number, userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member?memberId=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("deleteBannedMemeber", channelId, userId);
    const newBannedMembers = bannedMembers.filter(
      (member) => member.userId !== userId
    );
    setBannedMembers(newBannedMembers);
    // router.refresh();
  }

  async function createBannedMemeber(channelId: number, userId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/banned-member?memberId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("createBannedMemeber", channelId, userId);
    if (res.status > 299) {
      toast({
        title: "This user cannot ban",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const newMembers = members.filter((member) => member.userId !== userId);
    setMembers(newMembers);
    getBannedMemberList();
  }

  async function deleteChannel(channelId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("deleteChannel", channelId);
    if (res.status > 299) {
      toast({
        title: "Cannot delete channel",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function deleteBannedMemeberHandler(
    e: React.MouseEvent,
    channelId: number,
    userId: number
  ) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    await deleteBannedMemeber(channelId, userId);
  }

  async function createBannedMemeberHandler(
    e: React.MouseEvent,
    channelId: number,
    userId: number
  ) {
    e.stopPropagation(); // Prevent the event from propagating up to the parent element
    await createBannedMemeber(channelId, userId);
  }

  async function deleteChannelHandler(e: React.MouseEvent, channelId: number) {
    e.stopPropagation();
    await deleteChannel(channelId);
    router.push(`/channel`);
  }

  async function muteMember(channelId: number, memberId: number) {
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
    console.log("muteMember", channelId, memberId);
    console.log(await res.json());
    if (res.status > 299) {
      toast({
        title: "Cannot mute member",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Muted member ${memberId}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function muteMemberHandler(
    e: React.MouseEvent,
    channelId: number,
    memberId: number
  ) {
    e.stopPropagation();
    await muteMember(channelId, memberId);
  }

  async function updateChannelAdmin(channelId: number, memberId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${channelId}/admin?memberId=${memberId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("updateChannelAdmin", channelId, memberId);
    console.log(await res.json());
    if (res.status > 299) {
      toast({
        title: "Cannot update channel admin",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Updated channel admin ${memberId}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function updateChannelAdminHandler(
    e: React.MouseEvent,
    channelId: number,
    memberId: number
  ) {
    e.stopPropagation();
    await updateChannelAdmin(channelId, memberId);
    // member list refresh

    const newMembers = members.map((member) => {
      if (member.userId === memberId) {
        member.isAdmin = true;
      }
      return member;
    });
    setMembers(newMembers);
  }

  return (
    <Box padding={5}>
      <Text fontSize="xl" marginBottom={3}>
        Members
      </Text>
      {members.map((member, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius="md"
          padding={3}
          marginBottom={3}
          position={"relative"} // Add relative positioning so we can use absolute positioning on child
        >
          <LockIcon
            onClick={(e) => muteMemberHandler(e, channelId, member.userId)}
            position={"absolute"} // Set the position to absolute
            top={2} // Adjust these values as needed
            right={16} // Adjust these values as needed
          />
          <UnlockIcon
            position={"absolute"} // Set the position to absolute
            top={2} // Adjust these values as needed
            right={9} // Adjust these values as needed
          />
          <DeleteIcon
            onClick={(e) =>
              createBannedMemeberHandler(e, channelId, member.userId)
            }
            position={"absolute"} // Set the position to absolute
            top={2} // Adjust these values as needed
            right={2} // Adjust these values as needed
          />
          <Text>Member ID: {member.userId}</Text>
          <Text>Is Admin: {member.isAdmin ? "Yes" : "No"}</Text>
          <Text>Joined at: {member.createdAt}</Text>
          <Button
            onClick={(e) =>
              updateChannelAdminHandler(e, channelId, member.userId)
            }
          >
            관리자로 만들기
          </Button>
        </Box>
      ))}

      <Text fontSize="xl" marginBottom={3} marginTop={5}>
        Muted Members
      </Text>
      {mutedMembers.map((member, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius="md"
          padding={3}
          marginBottom={3}
        >
          <Text>Member ID: {member.userId}</Text>
          <Text>Muted at: {member.createdAt}</Text>
        </Box>
      ))}

      <Text fontSize="xl" marginBottom={3} marginTop={5}>
        Banned Members
      </Text>
      {bannedMembers.map((member, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius="md"
          padding={3}
          marginBottom={3}
          position={"relative"} // Add relative positioning so we can use absolute positioning on child
        >
          <SmallCloseIcon
            onClick={(e) =>
              deleteBannedMemeberHandler(e, channelId, member.userId)
            }
            position={"absolute"} // Set the position to absolute
            top={2} // Adjust these values as needed
            right={2} // Adjust these values as needed
          />
          <Text>Member ID: {member.userId}</Text>
          <Text>Banned at: {member.createdAt}</Text>
        </Box>
      ))}
      <Button onClick={(e) => deleteChannelHandler(e, channelId)}>
        Delete channel
      </Button>
    </Box>
  );
};

export default ChannelAdmin;
