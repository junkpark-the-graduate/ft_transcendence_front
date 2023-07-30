"use client";

import React, { useEffect, useState } from "react";
import ChannelAdmin from "../../components/ChannelAdmin";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import GridType3 from "@/ui/Grid/GridType3";
import ChannelEdit from "../../components/ChannelEdit";
import { Box } from "@chakra-ui/react";

export default async function Page({
  params,
}: {
  params: { channelId: number };
}) {
  const toast = useToast();
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  // const [channel, setChannel] = useState<any>({});
  // const [members, setMembers] = useState<any[]>([]);
  // const [mutedMembers, setMutedMembers] = useState<any[]>([]);
  // const [bannedMembers, setBannedMembers] = useState<any[]>([]);

  async function checkChannelAdmin() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}/admin`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resJson = await res.json();
    if (res.status > 299) {
      router.push("/channel");
      toast({
        title: resJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  // async function getChannel() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const tmp = await res.json();
  //   console.log(tmp);
  //   setChannel(tmp);
  // }

  // async function getMemberList() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}/member`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   setMembers(await res.json());
  // }

  // async function getMutedMemberList() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}/muted-member`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   setMutedMembers(await res.json());
  // }

  // async function getBannedMemberList() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACK_END_POINT}/channel/${params.channelId}/banned-member`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   setBannedMembers(await res.json());
  // }

  useEffect(() => {
    checkChannelAdmin();
    // getChannel();
    // getMemberList();
    // getMutedMemberList();
    // getBannedMemberList();
  }, [params.channelId]);

  return (
    <GridType3
      children={<ChannelEdit channelId={params.channelId} />}
      children1={<div>tmp</div>}
    />
  );
}
