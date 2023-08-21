"use client";

import React, { useEffect, useState } from "react";
import GridType4 from "@/ui/Grid/GridType3";
import ChannelEdit from "./ChannelEdit";
import ChannelMemberlList from "./ChannelMemberList";
import ChannelBannedMemberList from "./ChannelBannedMemberList";
import ChannelInvite from "./ChannelInvite";

interface Props {
  channelId: number;
}

const ChannelAdmin: React.FC<Props> = ({ channelId }) => {
  const [channel, setChannel] = useState<any>({});
  const [members, setMembers] = useState<any[]>([]);
  const [bannedMembers, setBannedMembers] = useState<any[]>([]);

  return (
    <GridType4
      children={
        <ChannelEdit
          channelId={channelId}
          channel={channel}
          setChannel={setChannel}
        />
      }
      children1={
        <ChannelMemberlList
          channelId={channelId}
          channel={channel}
          members={members}
          setMembers={setMembers}
          bannedMembers={bannedMembers}
          setBannedMembers={setBannedMembers}
        />
      }
      children2={
        <ChannelBannedMemberList
          channelId={channelId}
          bannedMembers={bannedMembers}
          setBannedMembers={setBannedMembers}
        />
      }
      children3={
        <ChannelInvite
          channelId={channelId}
          members={members}
          setMembers={setMembers}
          bannedMembers={bannedMembers}
        />
      }
    />
  );
};

export default ChannelAdmin;
