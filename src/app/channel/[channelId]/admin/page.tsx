"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ChannelAdmin from "../../components/ChannelAdmin";

export default function Page({ params }: { params: { channelId: number } }) {
  const toast = useToast();
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

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

  useEffect(() => {
    checkChannelAdmin();
  }, []);

  return <ChannelAdmin channelId={params.channelId} />;
}
