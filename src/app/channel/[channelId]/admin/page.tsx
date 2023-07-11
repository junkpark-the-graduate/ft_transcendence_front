"use client";

import React, { useEffect } from "react";
import ChannelAdmin from "../../components/ChannelAdmin";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default async function Page({
  params,
}: {
  params: { channelId: number };
}) {
  const toast = useToast();
  const router = useRouter();

  async function checkChannelAdmin() {
    const accessToken = Cookies.get("accessToken");
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
    if (res.status > 299) {
      router.push("/channel");
      toast({
        title: `You are not admin of this channel ${params.channelId}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    checkChannelAdmin();
  }, []);

  return <ChannelAdmin channelId={params.channelId} />;
}
