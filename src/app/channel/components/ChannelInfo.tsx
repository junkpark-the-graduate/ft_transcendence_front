"use client";

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import { SmallCloseIcon, DeleteIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

interface ChatProps {
  channelId: number;
}

const ChannelInfo: React.FC<ChatProps> = ({ channelId }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [mutedMembers, setMutedMembers] = useState<any[]>([]);
  const [bannedMembers, setBannedMembers] = useState<any[]>([]);
  const accessToken = Cookies.get("accessToken");
  // const router = useRouter();

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
    const newMembers = members.filter((member) => member.userId !== userId);
    setMembers(newMembers);
    getBannedMemberList();
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
          <Text>Muted at: {member.mutedAt}</Text>
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
    </Box>
  );
};

export default ChannelInfo;
