"use client";

import React, { useEffect, useState } from "react";
import GridType4 from "@/ui/Grid/GridType3";
import ChannelEdit from "./components/ChannelEdit";
import ChannelMemberlList from "./components/ChannelMemberList";
import ChannelBannedMemberList from "./components/ChannelBannedMemberList";
import ChannelInvite from "./components/ChannelInvite";
import ChannelAdmin from "./components/ChannelAdmin";

export default function Page({ params }: { params: { channelId: number } }) {
  return <ChannelAdmin channelId={params.channelId} />;
}
