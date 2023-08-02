"use client";

import React, { useState } from "react";
import GridType4 from "@/ui/Grid/GridType4";
import ChannelEdit from "../../components/ChannelEdit";
import ChannelMemberlList from "../../components/ChannelMemberList";
import ChannelBannedMemberList from "../../components/ChannelBannedMemberList";

export default function Page({ params }: { params: { channelId: number } }) {
  const [channel, setChannel] = useState<any>({});
  const [members, setMembers] = useState<any[]>([]);
  const [bannedMembers, setBannedMembers] = useState<any[]>([]);

  return (
    <GridType4
      children={
        <ChannelEdit
          channelId={params.channelId}
          channel={channel}
          setChannel={setChannel}
        />
      }
      children1={
        <ChannelMemberlList
          channelId={params.channelId}
          channel={channel}
          members={members}
          setMembers={setMembers}
          bannedMembers={bannedMembers}
          setBannedMembers={setBannedMembers}
        />
      }
      children2={
        <ChannelBannedMemberList
          channelId={params.channelId}
          bannedMembers={bannedMembers}
          setBannedMembers={setBannedMembers}
        />
      }
    />
  );
}
